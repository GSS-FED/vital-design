import Button from '@/components/button/Button';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { expect, it } from 'vitest';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from './Alert';

it('renders with alert role by default', () => {
  render(
    <Alert>
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        Something needs your attention.
      </AlertDescription>
    </Alert>,
  );

  expect(screen.getByRole('alert')).toBeInTheDocument();
  expect(screen.getByText('Heads up')).toHaveAttribute(
    'data-slot',
    'alert-title',
  );
  expect(
    screen.getByText('Something needs your attention.'),
  ).toHaveAttribute('data-slot', 'alert-description');
});

it('allows overriding the root role', () => {
  render(<Alert role="status">Saved</Alert>);

  expect(screen.getByRole('status')).toHaveTextContent('Saved');
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

it('renders alert action slot', () => {
  render(
    <Alert>
      <AlertTitle>Dark mode is available</AlertTitle>
      <AlertAction data-testid="alert-action">
        <Button variant="text">Enable</Button>
      </AlertAction>
    </Alert>,
  );

  const action = screen.getByTestId('alert-action');

  expect(action).toHaveAttribute('data-slot', 'alert-action');
});

it('applies custom class names and styles', () => {
  const style = { marginTop: '12px' };

  render(
    <Alert className="custom-alert" style={style}>
      <AlertTitle className="custom-title">Title</AlertTitle>
      <AlertDescription className="custom-description">
        Description
      </AlertDescription>
      <AlertAction className="custom-action">Action</AlertAction>
    </Alert>,
  );

  expect(screen.getByRole('alert')).toHaveClass('custom-alert');
  expect(screen.getByRole('alert')).toHaveStyle(style);
  expect(screen.getByText('Title')).toHaveClass('custom-title');
  expect(screen.getByText('Description')).toHaveClass(
    'custom-description',
  );
  expect(screen.getByText('Action')).toHaveClass('custom-action');
});

it('forwards refs to the root and slots', () => {
  const alertRef = createRef<HTMLDivElement>();
  const titleRef = createRef<HTMLDivElement>();
  const descriptionRef = createRef<HTMLDivElement>();
  const actionRef = createRef<HTMLDivElement>();

  render(
    <Alert ref={alertRef}>
      <AlertTitle ref={titleRef}>Title</AlertTitle>
      <AlertDescription ref={descriptionRef}>
        Description
      </AlertDescription>
      <AlertAction ref={actionRef}>Action</AlertAction>
    </Alert>,
  );

  expect(alertRef.current).toBe(screen.getByRole('alert'));
  expect(titleRef.current).toBe(screen.getByText('Title'));
  expect(descriptionRef.current).toBe(
    screen.getByText('Description'),
  );
  expect(actionRef.current).toBe(screen.getByText('Action'));
});
