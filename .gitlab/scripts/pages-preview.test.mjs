import assert from 'node:assert/strict';
import test from 'node:test';
import {
  isMissingPagesProject,
  previewUrlFromWranglerNdjson,
} from './pages-preview.mjs';

test('prefers the stable Pages alias over the deployment URL', () => {
  const url = previewUrlFromWranglerNdjson(
    [
      JSON.stringify({
        type: 'pages-deploy',
        url: 'https://abc123.vital-design-preview.pages.dev',
      }),
      JSON.stringify({
        type: 'pages-deploy-detailed',
        url: 'https://abc123.vital-design-preview.pages.dev',
        alias: 'https://mr-115.vital-design-preview.pages.dev',
      }),
    ].join('\n'),
  );
  assert.equal(url, 'https://mr-115.vital-design-preview.pages.dev');
});

test('falls back to the deployment URL when no alias was written', () => {
  const url = previewUrlFromWranglerNdjson(
    `${JSON.stringify({ type: 'pages-deploy', url: 'https://abc123.example.pages.dev' })}\n`,
  );
  assert.equal(url, 'https://abc123.example.pages.dev');
});

test('treats Cloudflare project-not-found as missing', () => {
  assert.equal(isMissingPagesProject(404, null), true);
  assert.equal(
    isMissingPagesProject(400, { errors: [{ code: 8000007 }] }),
    true,
  );
  assert.equal(
    isMissingPagesProject(403, { errors: [{ code: 10000 }] }),
    false,
  );
});
