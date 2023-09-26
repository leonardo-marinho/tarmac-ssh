import Spinner, { SpinnerProps } from '@/client/components/UI/Spinner/Spinner';
import { Meta, Story } from '@storybook/react';
import { JSX } from 'react';

export default {
  component: Spinner,
  title: 'Components/Spinner',
} as Meta;

const Template: Story<SpinnerProps> = (args: JSX.IntrinsicAttributes & SpinnerProps) => (
  <Spinner {...args} />
);
export const Size = Template.bind({});
Size.args = {
  size: 'small',
};
