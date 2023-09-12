import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';

export interface InlineNavItemProps extends HTMLAttributes<HTMLLIElement> {}

const InlineNavItem: FC<InlineNavItemProps> = ({ children, ...htmlProps }) => {
  return (
    <li
      {...htmlProps}
      className={classNames(
        `text-neutral-500 font-light text-base cursor-pointer hover:text-neutral-200`,
        htmlProps.className,
      )}
    >
      {children}
    </li>
  );
};

export default InlineNavItem;
