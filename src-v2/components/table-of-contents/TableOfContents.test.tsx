import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { expect, it, vi } from 'vitest';
import {
  TableOfContents,
  type TableOfContentsItem,
} from './TableOfContents';

const items: TableOfContentsItem[] = [
  { id: 'intro', label: '標題', level: 1 },
  { id: 'overview', label: '副標題', level: 2 },
  { id: 'detail', label: '內文', level: 3 },
];

function getRailLink(name: string) {
  return screen.getByRole('link', { name });
}

it('renders a navigation landmark with a rail link per item', () => {
  render(<TableOfContents items={items} aria-label="目錄" />);

  const nav = screen.getByRole('navigation', { name: '目錄' });
  expect(nav).toHaveAttribute('data-slot', 'table-of-contents');
  expect(nav).toHaveAttribute('data-side', 'right');

  // Rail links are the accessible navigation surface; panel links are hidden.
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(items.length);
  expect(getRailLink('標題')).toHaveAttribute('href', '#intro');
  expect(getRailLink('內文')).toHaveAttribute('data-level', '3');
});

it('marks the active item with aria-current from defaultValue', () => {
  render(<TableOfContents items={items} defaultValue="overview" />);

  expect(getRailLink('副標題')).toHaveAttribute(
    'aria-current',
    'location',
  );
  expect(getRailLink('標題')).not.toHaveAttribute('aria-current');
});

it('selects on click when uncontrolled and fires onValueChange', () => {
  const onValueChange = vi.fn();
  render(
    <TableOfContents items={items} onValueChange={onValueChange} />,
  );

  const link = getRailLink('內文');
  // Anchor navigation would jsdom-warn on hashchange; block default nav.
  fireEvent.click(link, { defaultPrevented: false });

  expect(onValueChange).toHaveBeenCalledWith('detail');
  expect(link).toHaveAttribute('aria-current', 'location');
});

it('stays controlled: click does not move active without value change', () => {
  const onValueChange = vi.fn();
  render(
    <TableOfContents
      items={items}
      value="intro"
      onValueChange={onValueChange}
    />,
  );

  fireEvent.click(getRailLink('內文'));

  expect(onValueChange).toHaveBeenCalledWith('detail');
  // Active stays on the controlled value until the parent updates it.
  expect(getRailLink('標題')).toHaveAttribute(
    'aria-current',
    'location',
  );
  expect(getRailLink('內文')).not.toHaveAttribute('aria-current');
});

it('follows a controlled value update', () => {
  function Controlled() {
    const [value, setValue] = useState('intro');
    return (
      <TableOfContents
        items={items}
        value={value}
        onValueChange={setValue}
      />
    );
  }
  render(<Controlled />);

  fireEvent.click(getRailLink('副標題'));

  expect(getRailLink('副標題')).toHaveAttribute(
    'aria-current',
    'location',
  );
});

it('flips rail alignment for the left side', () => {
  render(<TableOfContents items={items} side="left" />);

  expect(screen.getByRole('navigation')).toHaveAttribute(
    'data-side',
    'left',
  );
  // Rail links carry the alignment; only the rail list is in the a11y tree
  // (the panel list is aria-hidden), so every link queried is a rail link.
  for (const link of screen.getAllByRole('link')) {
    expect(link).toHaveClass('justify-start');
  }
});

it('opens on pointer enter and closes on pointer leave', () => {
  render(<TableOfContents items={items} />);
  const nav = screen.getByRole('navigation');

  expect(nav).toHaveAttribute('data-state', 'closed');
  fireEvent.pointerEnter(nav);
  expect(nav).toHaveAttribute('data-state', 'open');
  fireEvent.pointerLeave(nav);
  expect(nav).toHaveAttribute('data-state', 'closed');
});

it('opens on focus within and closes when focus leaves', () => {
  render(<TableOfContents items={items} />);
  const nav = screen.getByRole('navigation');

  fireEvent.focus(getRailLink('標題'));
  expect(nav).toHaveAttribute('data-state', 'open');
  fireEvent.blur(getRailLink('標題'), {
    relatedTarget: document.body,
  });
  expect(nav).toHaveAttribute('data-state', 'closed');
});

it('lets the expanded prop override interaction', () => {
  const { rerender } = render(
    <TableOfContents items={items} expanded={false} />,
  );
  const nav = screen.getByRole('navigation');

  expect(nav).toHaveAttribute('data-state', 'closed');
  // Forced-closed ignores hover.
  fireEvent.pointerEnter(nav);
  expect(nav).toHaveAttribute('data-state', 'closed');

  rerender(<TableOfContents items={items} expanded />);
  expect(nav).toHaveAttribute('data-state', 'open');
});
