/// <reference types="vite/client" />
// Fixture app (`pnpm run fixtures:dev`): one URL per docs example,
// `?id=<fixture id>`, plus scratch files from ./playground (gitignored),
// `?playground=<file name>`. No Storybook runtime.
import '@fontsource/noto-sans-tc/400.css';
import '@fontsource/noto-sans-tc/500.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import './fixtures.css';
import { fixtures, loadFixture } from './load';

// One default-exported component per file. Not reviewed or screenshotted.
const playground = import.meta.glob<{ default: ComponentType }>(
  './playground/*.tsx',
);
const playgroundName = (key: string) =>
  key.replace('./playground/', '').replace(/\.tsx$/, '');

const root = createRoot(document.getElementById('root')!);
const params = new URLSearchParams(location.search);
const entry = fixtures.find(
  (fixture) => fixture.id === params.get('id'),
);
const scratch = Object.keys(playground).find(
  (key) => playgroundName(key) === params.get('playground'),
);

document.body.classList.add('layout-padded');

if (entry) {
  void loadFixture(entry).then(({ Component }) =>
    root.render(<Component />),
  );
} else if (scratch) {
  void playground[scratch]().then((mod) => {
    const Component = mod.default;
    root.render(<Component />);
  });
} else {
  root.render(
    <ul className="text-sm">
      {Object.keys(playground).map((key) => (
        <li key={key}>
          <a
            className="text-primary-600"
            href={`?playground=${playgroundName(key)}`}
          >
            {playgroundName(key)}
          </a>{' '}
          <span className="text-grayscale-500">playground</span>
        </li>
      ))}
      {fixtures.map((fixture) => (
        <li key={fixture.id}>
          <a className="text-primary-600" href={`?id=${fixture.id}`}>
            {fixture.id}
          </a>
        </li>
      ))}
    </ul>,
  );
}
