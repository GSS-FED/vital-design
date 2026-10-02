#!/usr/bin/env tsx
import { existsSync, readdirSync, rmSync, writeFileSync } from 'fs';
import { registry } from '../registry/index';

const publicRegistryDir = 'public/r';

if (existsSync(publicRegistryDir)) {
  for (const entry of readdirSync(publicRegistryDir)) {
    if (entry.endsWith('.json')) {
      rmSync(`${publicRegistryDir}/${entry}`);
    }
  }
}

const output = JSON.stringify(registry, null, 2);
writeFileSync('registry.json', output + '\n');
console.log(
  `✔ registry.json updated (${registry.items.length} items)`,
);
