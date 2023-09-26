import Button, { ButtonProps } from '@/client/components/UI/Button/Button';
import { Meta, Story } from '@storybook/react';
import { JSX } from 'react';

export default {
  component: Button,
  title: 'Components/Button',
} as Meta;

const Template: Story<ButtonProps> = (args: JSX.IntrinsicAttributes & ButtonProps) => (
  <Button {...args} />
);
export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
  variant: 'primary',
};
export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
  variant: 'secondary',
};
export const Small = Template.bind({});
Small.args = {
  label: 'Button',
  size: 'small',
};
export const Large = Template.bind({});
Large.args = {
  label: 'Button',
  size: 'large',
};
export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  label: 'Button',
  size: 'small',
};
export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
  label: 'Button',
  size: 'small',
};
export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: '_missing',
  label: 'Button',
  size: 'small',
};
