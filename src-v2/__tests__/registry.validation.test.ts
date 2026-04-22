import * as fs from 'fs';
import * as path from 'path';
import { beforeAll, describe, expect, it } from 'vitest';
import type { RegistryItem } from '../../registry/types';

const ROOT_DIR = path.resolve(__dirname, '../..');
const REGISTRY_PATH = path.join(ROOT_DIR, 'registry.json');

interface Registry {
  $schema: string;
  $registry?: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

describe('Registry Validation', () => {
  let registry: Registry;

  beforeAll(() => {
    const registryContent = fs.readFileSync(REGISTRY_PATH, 'utf-8');
    registry = JSON.parse(registryContent) as Registry;
  });

  describe('File Existence', () => {
    it('all files referenced in registry.json should exist', () => {
      const missingFiles: string[] = [];

      for (const item of registry.items) {
        // Skip items without files (e.g., registry:style uses cssVars)
        if (!item.files) continue;

        for (const file of item.files) {
          const filePath = path.join(ROOT_DIR, file.path);
          if (!fs.existsSync(filePath)) {
            missingFiles.push(`${item.name}: ${file.path}`);
          }
        }
      }

      expect(
        missingFiles,
        `Missing files:\n${missingFiles.join('\n')}`,
      ).toHaveLength(0);
    });
  });

  describe('Registry Dependencies Validation', () => {
    it('registryDependencies should reference existing registry items', () => {
      const itemNames = new Set(
        registry.items.map((item) => item.name),
      );
      const invalidDeps: string[] = [];

      for (const item of registry.items) {
        if (
          item.registryDependencies &&
          item.registryDependencies.length > 0
        ) {
          for (const dep of item.registryDependencies) {
            // Extract item name from prefixed format
            // e.g., "@vital-design/utils" -> "utils"
            const depName = dep.startsWith('@vital-design/')
              ? dep.replace('@vital-design/', '')
              : dep;

            if (!itemNames.has(depName)) {
              invalidDeps.push(
                `${item.name}: references non-existent item "${dep}"`,
              );
            }
          }
        }
      }

      expect(
        invalidDeps,
        `Invalid registryDependencies:\n${invalidDeps.join('\n')}`,
      ).toHaveLength(0);
    });

    it('registryDependencies should use @vital-design/ prefix', () => {
      const unprefixedDeps: string[] = [];

      for (const item of registry.items) {
        if (
          item.registryDependencies &&
          item.registryDependencies.length > 0
        ) {
          for (const dep of item.registryDependencies) {
            if (!dep.startsWith('@vital-design/')) {
              unprefixedDeps.push(
                `${item.name}: "${dep}" should be "@vital-design/${dep}"`,
              );
            }
          }
        }
      }

      expect(
        unprefixedDeps,
        `Unprefixed registryDependencies:\n${unprefixedDeps.join('\n')}`,
      ).toHaveLength(0);
    });
  });

  describe('Import Type Checking', () => {
    it('source files should use import type for type-only imports', () => {
      const typeOnlyImports = [
        'CSSProperties',
        'ReactNode',
        'ForwardedRef',
        'HTMLAttributes',
        'InputHTMLAttributes',
      ];

      const violations: string[] = [];

      for (const item of registry.items) {
        // Skip items without files (e.g., registry:style uses cssVars)
        if (!item.files) continue;

        for (const file of item.files) {
          if (!file.path.endsWith('.tsx')) continue;

          const filePath = path.join(ROOT_DIR, file.path);
          if (!fs.existsSync(filePath)) continue;

          const content = fs.readFileSync(filePath, 'utf-8');
          const lines = content.split('\n');

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i] ?? '';
            // Skip if already using `import type { Foo }` or inline `import { type Foo }` syntax
            if (line.includes('import type')) continue;
            if (line.includes('{ type ') || line.includes('{type '))
              continue;
            // Skip if not an import from react
            if (!line.includes("from 'react'")) continue;

            // Check for type-only imports without 'type' keyword
            for (const typeImport of typeOnlyImports) {
              // Match patterns like "import { CSSProperties" or
              // "import { Something, CSSProperties"
              const hasTypeImport = new RegExp(
                `import\\s*\\{[^}]*\\b${typeImport}\\b`,
              ).test(line);

              if (hasTypeImport) {
                // Check if it's a mixed import (has both value
                // and type imports)
                const hasValueImport =
                  /\b(useState|useEffect|useRef|useMemo|useCallback|useContext|createContext|forwardRef|Fragment)\b/.test(
                    line,
                  );

                if (hasValueImport) {
                  violations.push(
                    `${file.path}:${i + 1} - Mixed import should separate type imports: ${typeImport}`,
                  );
                } else {
                  violations.push(
                    `${file.path}:${i + 1} - Should use 'import type' for: ${typeImport}`,
                  );
                }
              }
            }
          }
        }
      }

      expect(
        violations,
        `Import type violations:\n${violations.join('\n')}`,
      ).toHaveLength(0);
    });
  });

  describe('NPM Dependencies Completeness', () => {
    it('components using cn() should have clsx and tailwind-merge', () => {
      const missingDeps: string[] = [];

      for (const item of registry.items) {
        // Skip lib/hook/style types
        if (
          item.type === 'registry:lib' ||
          item.type === 'registry:hook' ||
          item.type === 'registry:style'
        ) {
          continue;
        }

        // Skip items without files
        if (!item.files) continue;

        // Check if any file uses cn()
        let usesCn = false;
        for (const file of item.files) {
          const filePath = path.join(ROOT_DIR, file.path);
          if (!fs.existsSync(filePath)) continue;

          const content = fs.readFileSync(filePath, 'utf-8');
          if (
            content.includes("from '@/utils/cn'") ||
            content.includes('cn(')
          ) {
            usesCn = true;
            break;
          }
        }

        if (usesCn) {
          const deps = item.dependencies || [];
          const hasClsx = deps.includes('clsx');
          const hasTwMerge = deps.includes('tailwind-merge');

          if (!hasClsx || !hasTwMerge) {
            const missing = [];
            if (!hasClsx) missing.push('clsx');
            if (!hasTwMerge) missing.push('tailwind-merge');
            missingDeps.push(
              `${item.name}: missing [${missing.join(', ')}]`,
            );
          }
        }
      }

      expect(
        missingDeps,
        `Components using cn() missing dependencies:\n${missingDeps.join('\n')}`,
      ).toHaveLength(0);
    });
  });

  describe('Icon Import Format', () => {
    it('should use specific icon imports instead of barrel imports', () => {
      const violations: string[] = [];

      for (const item of registry.items) {
        // Skip items without files (e.g., registry:style uses cssVars)
        if (!item.files) continue;

        for (const file of item.files) {
          if (!file.path.endsWith('.tsx')) continue;

          const filePath = path.join(ROOT_DIR, file.path);
          if (!fs.existsSync(filePath)) continue;

          const content = fs.readFileSync(filePath, 'utf-8');
          const lines = content.split('\n');

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i] ?? '';

            // Check for barrel import from @/icons
            if (
              line.includes("from '@/icons'") &&
              !line.includes("from '@/icons/")
            ) {
              violations.push(
                `${file.path}:${i + 1} - Use specific icon imports (e.g., @/icons/SpinnerIcon) instead of barrel import`,
              );
            }
          }
        }
      }

      expect(
        violations,
        `Barrel import violations:\n${violations.join('\n')}`,
      ).toHaveLength(0);
    });
  });

  describe('Registry Structure', () => {
    it('registry.json should have valid schema', () => {
      expect(registry.$schema).toBe(
        'https://ui.shadcn.com/schema/registry.json',
      );
      expect(registry.name).toBe('vital-design');
      expect(Array.isArray(registry.items)).toBe(true);
    });

    it('all items should have required fields', () => {
      const invalidItems: string[] = [];

      for (const item of registry.items) {
        const missing: string[] = [];
        if (!item.name) missing.push('name');
        if (!item.type) missing.push('type');
        if (!item.title) missing.push('title');
        if (!item.description) missing.push('description');
        // registry:theme uses cssVars instead of files
        if (
          item.type === 'registry:theme' ||
          item.type === 'registry:style'
        ) {
          if (!item.cssVars) {
            missing.push('cssVars');
          }
          // registry:base is an aggregator with only registryDependencies
        } else if (
          item.type !== 'registry:base' &&
          (!item.files || item.files.length === 0)
        ) {
          missing.push('files');
        }

        if (missing.length > 0) {
          invalidItems.push(
            `${item.name || 'unknown'}: missing [${missing.join(', ')}]`,
          );
        }
      }

      expect(
        invalidItems,
        `Items with missing required fields:\n${invalidItems.join('\n')}`,
      ).toHaveLength(0);
    });
  });
});
