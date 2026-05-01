import { Checkbox } from '@/components/checkbox/Checkbox';
import { Input } from '@/components/input/input/Input';
import { type Meta, type StoryObj } from '@storybook/react';
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

type Story = StoryObj<typeof Field>;

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  args: {
    orientation: 'vertical',
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal', 'responsive'],
    },
  },
};

export default meta;

export const Default: Story = {
  render: (args) => (
    <Field {...args} className="w-80">
      <FieldLabel htmlFor="field-email">Email</FieldLabel>
      <Input id="field-email" placeholder="name@example.com" />
      <FieldDescription>
        Used for notifications and account recovery.
      </FieldDescription>
    </Field>
  ),
};

export const Invalid: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Field className="w-80" data-invalid="true">
      <FieldLabel htmlFor="field-invalid-email">Email</FieldLabel>
      <Input
        id="field-invalid-email"
        placeholder="name@example.com"
        aria-invalid
      />
      <FieldError errors={[{ message: 'Enter a valid email.' }]} />
    </Field>
  ),
};

export const Horizontal: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Field orientation="horizontal" className="w-80">
      <FieldLabel
        htmlFor="field-horizontal-email"
        className="!w-[100px] !flex-none py-1.5"
      >
        Email
      </FieldLabel>
      <FieldContent>
        <Input
          id="field-horizontal-email"
          placeholder="name@example.com"
        />
        <FieldDescription>Used for account alerts.</FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const WithContent: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Field className="w-80" orientation="horizontal">
      <Checkbox id="field-notifications" />
      <FieldContent>
        <FieldLabel htmlFor="field-notifications">
          Notifications
        </FieldLabel>
        <FieldDescription>
          Email, SMS, and push delivery options.
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const Grouped: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <FieldSet className="w-80">
      <FieldLegend>Profile</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-name">Name</FieldLabel>
          <Input id="field-name" placeholder="Ada Lovelace" />
        </Field>
        <Field>
          <FieldLabel htmlFor="field-role">Role</FieldLabel>
          <Input id="field-role" placeholder="Researcher" />
        </Field>
        <FieldSeparator>Optional</FieldSeparator>
        <Field orientation="horizontal">
          <Checkbox id="field-public" />
          <FieldContent>
            <FieldTitle>Public profile</FieldTitle>
            <FieldDescription>
              Show this profile in team directories.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
