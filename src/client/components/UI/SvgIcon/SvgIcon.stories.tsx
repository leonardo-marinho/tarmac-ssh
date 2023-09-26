import SvgIcon, { SvgIconProps } from '@/client/components/UI/SvgIcon/SvgIcon';
import { Meta, Story } from '@storybook/react';

export default {
  component: SvgIcon,
  title: 'Components/SvgIcon',
} as Meta;

const Template: Story<SvgIconProps> = (args) => <SvgIcon {...args} size={args.size || 'medium'} />;
export const MissingIcon = Template.bind({});
MissingIcon.args = {
  icon: '_missing',
};
