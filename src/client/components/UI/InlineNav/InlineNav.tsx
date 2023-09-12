import { FC, HTMLAttributes } from 'react';

export interface InlineNavProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {}

const InlineNav: FC<InlineNavProps> = ({ children, ...htmlProps }) => {
  return (
    <nav {...htmlProps}>
      <ul className="flex h-full flex-row items-center gap-14">{children}</ul>
    </nav>
  );
};

export default InlineNav;
