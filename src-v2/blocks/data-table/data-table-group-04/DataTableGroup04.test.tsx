import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { DataTableGroup04 } from './DataTableGroup04';

function getRow(index: number) {
  const row = screen.getAllByRole('row')[index];
  if (!row) {
    throw new Error(`Expected row ${index} to exist`);
  }
  return row;
}

describe('DataTableGroup04', () => {
  it('collapses extra tags into a count pill', () => {
    render(<DataTableGroup04 />);

    const firstRow = getRow(1);
    expect(within(firstRow).getByText('綠線線')).toBeInTheDocument();
    expect(within(firstRow).getByText('+1')).toBeInTheDocument();
    expect(
      within(firstRow).queryByText('ISO'),
    ).not.toBeInTheDocument();
  });

  it('refreshes tag checkbox state while the popover stays open', async () => {
    render(<DataTableGroup04 />);
    const user = userEvent.setup();

    await user.click(
      screen.getByRole('button', { name: '綠線線 +1' }),
    );
    const dialog = screen.getByRole('dialog');
    await user.click(
      within(dialog).getByRole('option', { name: '試行' }),
    );

    expect(
      within(dialog).getByRole('option', { name: '試行' }),
    ).toHaveAttribute('aria-selected', 'true');

    await user.click(
      within(dialog).getByRole('option', { name: '重點' }),
    );
    expect(
      within(dialog).getByRole('option', { name: '試行' }),
    ).toHaveAttribute('aria-selected', 'true');
    expect(
      within(dialog).getByRole('option', { name: '重點' }),
    ).toHaveAttribute('aria-selected', 'true');

    const firstRow = getRow(1);
    expect(within(firstRow).getByText('+3')).toBeInTheDocument();
  });
});
