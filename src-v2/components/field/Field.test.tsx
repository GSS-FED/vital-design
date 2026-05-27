import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from './Field';

it('renders the field compound slots', () => {
  render(
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <input id="email" />
      <FieldDescription>Used for account alerts.</FieldDescription>
    </Field>,
  );

  const field = screen.getByRole('group');
  const label = screen.getByText('Email');
  const description = screen.getByText('Used for account alerts.');

  expect(field).toHaveAttribute('data-slot', 'field');
  expect(field).toHaveAttribute('data-orientation', 'vertical');
  expect(field).toHaveClass('flex-col', 'gap-1');
  expect(label).toHaveAttribute('data-slot', 'field-label');
  expect(label).toHaveClass('font-normal', 'leading-5');
  expect(description).toHaveAttribute(
    'data-slot',
    'field-description',
  );
  expect(description).toHaveClass('text-xs', 'leading-4');
  expect(description).toHaveClass('text-grayscale-opacity-600');
  expect(screen.getByLabelText('Email')).toHaveAttribute(
    'id',
    'email',
  );
});

it('supports horizontal and responsive orientations', () => {
  const { rerender } = render(
    <Field orientation="horizontal" data-testid="field" />,
  );

  expect(screen.getByTestId('field')).toHaveAttribute(
    'data-orientation',
    'horizontal',
  );
  expect(screen.getByTestId('field')).toHaveClass(
    'flex-row',
    'items-start',
    'gap-2',
  );

  rerender(<Field orientation="responsive" data-testid="field" />);

  expect(screen.getByTestId('field')).toHaveAttribute(
    'data-orientation',
    'responsive',
  );
  expect(screen.getByTestId('field')).toHaveClass(
    '@md/field-group:flex-row',
  );
});

it('renders fieldset, legend, group, content, and title slots', () => {
  render(
    <FieldSet>
      <FieldLegend variant="label">Profile</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldContent data-testid="field-content">
            <FieldTitle>Display name</FieldTitle>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>,
  );

  expect(screen.getByText('Profile')).toHaveAttribute(
    'data-slot',
    'field-legend',
  );
  expect(screen.getByText('Profile')).toHaveAttribute(
    'data-variant',
    'label',
  );
  expect(screen.getByText('Display name')).toHaveAttribute(
    'data-slot',
    'field-label',
  );
  expect(screen.getByTestId('field-content')).toHaveClass('gap-1');
});

it('renders a separator with optional content', () => {
  render(<FieldSeparator>or</FieldSeparator>);

  expect(screen.getByText('or')).toHaveAttribute(
    'data-slot',
    'field-separator-content',
  );
  expect(screen.getByRole('separator')).toHaveAttribute(
    'data-slot',
    'separator',
  );
});

it('renders field errors from children or unique error messages', () => {
  const { rerender } = render(<FieldError>Required</FieldError>);

  expect(screen.getByRole('alert')).toHaveTextContent('Required');

  rerender(
    <FieldError
      errors={[
        { message: 'Required' },
        { message: 'Required' },
        { message: 'Must be an email' },
      ]}
    />,
  );

  expect(screen.getByRole('alert')).toHaveTextContent('Required');
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Must be an email',
  );
  expect(screen.getAllByText('Required')).toHaveLength(1);
});

it('does not render an empty error', () => {
  const { container } = render(<FieldError errors={[]} />);

  expect(container).toBeEmptyDOMElement();
});
