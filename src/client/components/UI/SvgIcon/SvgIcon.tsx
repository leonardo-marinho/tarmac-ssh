import SvgIcons from '@/client/assets/SvgIcons';
import SvgIconUtils from '@/client/components/UI/SvgIcon/SvgIcon.utils';
import { TSvgIcons } from '@/client/types';
import { FC, useMemo } from 'react';

const DEFAULT_VIEW_BOX = '0 0 24 24';

export type SvgIconSizesType = 'large' | 'medium' | 'small';

export interface SvgIconProps extends React.HTMLAttributes<SVGElement> {
  color?: string;
  icon: TSvgIcons;
  size: SvgIconSizesType;
  viewBox?: string;
}

const SvgIcon: FC<SvgIconProps> = ({ color, icon, size, viewBox = DEFAULT_VIEW_BOX, ...props }) => {
  const IconComponent = SvgIcons[icon as keyof typeof SvgIcons] || SvgIcons._missing;
  const computedSize = useMemo(() => SvgIconUtils.getSize(size), [size]);

  return (
    <svg
      {...props}
      height={'16px'}
      style={{
        fill: color,
        height: computedSize,
        width: computedSize,
        ...props.style,
      }}
      viewBox={viewBox}
      width={'16px'}
    >
      <IconComponent />
    </svg>
  );
};

export default SvgIcon;
