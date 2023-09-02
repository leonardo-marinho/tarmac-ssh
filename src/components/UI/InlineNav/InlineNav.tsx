import { FC, HTMLAttributes } from 'react';

export interface InlineNavProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {}

const InlineNav: FC<InlineNavProps> = ({ children, ...htmlProps }) => {
  return (
    <nav {...htmlProps}>
      <ul className="h-full gap-14 flex flex-row items-center">{children}</ul>
    </nav>
  );
};

export default InlineNav;
