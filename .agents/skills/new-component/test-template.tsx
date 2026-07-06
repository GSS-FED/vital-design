// 測試結構模板
// 替換所有 ComponentName 為實際元件名稱
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ComponentName from './ComponentName';

it('renders correctly', () => {
  render(<ComponentName />);
  expect(screen.getByRole('...')).toBeInTheDocument();
});

it('applies custom className and style', () => {
  render(
    <ComponentName
      className="custom-class"
      style={{ color: 'red' }}
    />,
  );
  expect(screen.getByRole('...')).toHaveClass('custom-class');
  expect(screen.getByRole('...')).toHaveStyle({ color: 'red' });
});

// 事件處理測試
it('calls onChange when interacted', async () => {
  const handleChange = vi.fn();
  render(<ComponentName onChange={handleChange} />);
  await userEvent.click(screen.getByRole('...'));
  expect(handleChange).toHaveBeenCalledWith(/* expected value */);
});
