/// <reference types="vite/client" />
// Shared by the fixture app (main.tsx) and the screenshot test
// (visual/fixtures.test.tsx): resolves a manifest entry to a component.
import type { ComponentType } from 'react';
import type { FixtureEntry } from './manifest';
import manifestJson from './manifest.json';

export const fixtures = manifestJson as FixtureEntry[];

// Keys match FixtureEntry.file (paths relative to this folder).
const modules = {
  ...import.meta.glob('../../src-v2/**/examples/*.tsx'),
} as Record<string, () => Promise<Record<string, unknown>>>;

export async function loadFixture(
  entry: FixtureEntry,
): Promise<{ Component: ComponentType }> {
  const mod = await modules[entry.file]();
  return { Component: mod[entry.exportName] as ComponentType };
}
