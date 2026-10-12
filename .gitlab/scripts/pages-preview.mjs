import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const WRANGLER_VERSION = '4.147.0';

export function previewUrlFromWranglerNdjson(text) {
  let alias;
  let url;
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    let entry;
    try {
      entry = JSON.parse(trimmed);
    } catch {
      continue;
    }
    if (entry.type === 'pages-deploy-detailed') {
      if (entry.alias) alias = entry.alias;
      if (entry.url) url = entry.url;
    } else if (entry.type === 'pages-deploy' && entry.url) {
      url = entry.url;
    }
  }
  return alias || url || null;
}

export function isMissingPagesProject(status, payload) {
  if (status === 404) return true;
  return Boolean(
    payload?.errors?.some((error) => error.code === 8000007),
  );
}

function projectName() {
  const name =
    process.env.CLOUDFLARE_PAGES_PROJECT || 'vital-design-preview';
  if (!/^[a-z0-9][a-z0-9-]*$/.test(name)) {
    throw new Error(
      `CLOUDFLARE_PAGES_PROJECT must be a lowercase Pages project name. Received "${name}".`,
    );
  }
  return name;
}

function requireCloudflareEnv() {
  if (
    !process.env.CLOUDFLARE_API_TOKEN ||
    !process.env.CLOUDFLARE_ACCOUNT_ID
  ) {
    throw new Error(
      'CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID are required.',
    );
  }
}

async function cloudflare(
  pathName,
  { method = 'GET', body, search } = {},
) {
  requireCloudflareEnv();
  const url = new URL(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}${pathName}`,
  );
  for (const [key, value] of Object.entries(search ?? {})) {
    url.searchParams.set(key, value);
  }
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await response.text();
  let payload = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = null;
    }
  }
  return { response, payload };
}

async function ensureProject() {
  const name = projectName();
  const existing = await cloudflare(`/pages/projects/${name}`);
  if (existing.response.ok && existing.payload?.success !== false)
    return name;
  if (
    !isMissingPagesProject(existing.response.status, existing.payload)
  ) {
    throw new Error(
      `Could not read Cloudflare Pages project "${name}": HTTP ${existing.response.status}.`,
    );
  }
  const created = await cloudflare('/pages/projects', {
    method: 'POST',
    body: { name, production_branch: 'main' },
  });
  if (!created.response.ok || created.payload?.success === false) {
    throw new Error(
      `Could not create Cloudflare Pages project "${name}": HTTP ${created.response.status}.`,
    );
  }
  console.log(`Created Cloudflare Pages project ${name}.`);
  return name;
}

function runWrangler(args, { outputPath } = {}) {
  const env = { ...process.env, CI: 'true' };
  if (outputPath) env.WRANGLER_OUTPUT_FILE_PATH = outputPath;
  const result = spawnSync(
    'npx',
    ['--yes', `wrangler@${WRANGLER_VERSION}`, ...args],
    { stdio: 'inherit', env },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      `wrangler exited with status ${result.status ?? 'unknown'}.`,
    );
  }
}

async function deploy(directory, branch, dotenvPath, variableName) {
  await ensureProject();
  const outputPath = 'wrangler-pages.ndjson';
  writeFileSync(outputPath, '');
  const args = [
    'pages',
    'deploy',
    directory,
    '--project-name',
    projectName(),
    '--branch',
    branch,
    '--commit-dirty=true',
    // Stay on Pages. Wrangler can otherwise send a new static project to Workers.
    '--force',
  ];
  if (process.env.CI_COMMIT_SHA) {
    args.push('--commit-hash', process.env.CI_COMMIT_SHA);
  }
  runWrangler(args, { outputPath });
  const url = previewUrlFromWranglerNdjson(
    readFileSync(outputPath, 'utf8'),
  );
  if (!url) {
    throw new Error(
      'Wrangler finished without a Pages URL. Expected a pages-deploy-detailed alias.',
    );
  }
  writeFileSync(dotenvPath, `${variableName}=${url}\n`);
  console.log(`${variableName}=${url}`);
}

async function deleteBranch(branch) {
  const name = projectName();
  const ids = [];
  for (let page = 1; page <= 20; page += 1) {
    const listed = await cloudflare(
      `/pages/projects/${name}/deployments`,
      {
        search: {
          env: 'preview',
          per_page: '25',
          page: String(page),
        },
      },
    );
    if (listed.response.status === 404) {
      console.log(
        `Pages project ${name} does not exist; nothing to delete.`,
      );
      return;
    }
    if (!listed.response.ok || listed.payload?.success === false) {
      throw new Error(
        `Could not list Pages deployments: HTTP ${listed.response.status}.`,
      );
    }
    const result = listed.payload?.result ?? [];
    for (const deployment of result) {
      if (
        deployment.deployment_trigger?.metadata?.branch === branch
      ) {
        ids.push(deployment.id);
      }
    }
    if (result.length < 25) break;
  }
  if (ids.length === 0) {
    console.log(`No Pages deployments for branch ${branch}.`);
    return;
  }
  for (const id of ids) {
    const deleted = await cloudflare(
      `/pages/projects/${name}/deployments/${id}`,
      { method: 'DELETE', search: { force: 'true' } },
    );
    if (!deleted.response.ok || deleted.payload?.success === false) {
      throw new Error(
        `Could not delete Pages deployment ${id}: HTTP ${deleted.response.status}.`,
      );
    }
    console.log(`Deleted Pages deployment ${id} (${branch}).`);
  }
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (command === 'deploy') {
    const [directory, branch, dotenvPath, variableName] = args;
    if (!directory || !branch || !dotenvPath || !variableName) {
      throw new Error(
        'Usage: pages-preview.mjs deploy <directory> <branch> <dotenv> <variable>',
      );
    }
    await deploy(directory, branch, dotenvPath, variableName);
    return;
  }
  if (command === 'delete-branch') {
    const [branch] = args;
    if (!branch) {
      throw new Error(
        'Usage: pages-preview.mjs delete-branch <branch>',
      );
    }
    await deleteBranch(branch);
    return;
  }
  throw new Error('Usage: pages-preview.mjs deploy | delete-branch');
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
