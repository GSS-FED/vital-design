import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import Tooltip from './tooltip';

it('renders the trigger', () => {
  const props = {
    content: 'Hello World',
  };
  render(<Tooltip {...props}>Hover me</Tooltip>);
  const trigger = screen.getByText('Hover me');
  expect(trigger).toBeInTheDocument();
  expect(trigger).toHaveTextContent('Hover me');
});

it('opens the tooltip when trigger hovered', async () => {
  const props = {
    content: 'Hello World',
  };
  render(<Tooltip {...props}>Hover me</Tooltip>);
  const trigger = screen.getByText('Hover me');
  await userEvent.hover(trigger);
  const tooltip = await screen.findByRole('tooltip');
  expect(tooltip).toBeInTheDocument();
  expect(tooltip).toHaveTextContent(props.content);
});

it('closes the tooltip when trigger blurred', async () => {
  const props = {
    content: 'Hello World',
  };
  render(<Tooltip {...props}>Hover me</Tooltip>);
  const trigger = screen.getByText('Hover me');
  await userEvent.hover(trigger);
  const tooltip = await screen.findByRole('tooltip');
  expect(tooltip).toBeInTheDocument();
  expect(tooltip).toHaveTextContent(props.content);
  await userEvent.click(document.body); // 脫離 hover 狀態
  expect(tooltip).not.toBeInTheDocument();
});
