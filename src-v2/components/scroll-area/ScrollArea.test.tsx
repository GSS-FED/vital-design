import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScrollArea, ScrollAreaViewport } from './ScrollArea';

describe('ScrollArea', () => {
  it('renders root and viewport slots', () => {
    render(
      <ScrollArea data-testid="root">
        <ScrollAreaViewport data-testid="viewport">
          Content
        </ScrollAreaViewport>
      </ScrollArea>,
    );

    expect(screen.getByTestId('root')).toHaveAttribute(
      'data-slot',
      'scroll-area',
    );
    expect(screen.getByTestId('viewport')).toHaveAttribute(
      'data-slot',
      'scroll-area-viewport',
    );
  });

  it('applies the edge fade when requested', () => {
    render(
      <ScrollArea>
        <ScrollAreaViewport
          data-testid="viewport"
          fadeEdges
          fadeSize={24}
        />
      </ScrollArea>,
    );

    const viewport = screen.getByTestId('viewport');

    expect(viewport).toHaveClass('[mask-repeat:no-repeat]');
    expect(viewport).toHaveStyle({
      '--vital-scroll-area-fade-size': '24px',
    });
  });

  it('keeps a state-function style when fading edges', () => {
    render(
      <ScrollArea>
        <ScrollAreaViewport
          data-testid="viewport"
          fadeEdges
          fadeSize={24}
          style={() => ({ maxHeight: '120px' })}
        />
      </ScrollArea>,
    );

    expect(screen.getByTestId('viewport')).toHaveStyle({
      '--vital-scroll-area-fade-size': '24px',
      maxHeight: '120px',
    });
  });
});
