import { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

export interface InlineNavItemProps extends HTMLAttributes<HTMLLIElement> {
  active?: boolean;
}

const InlineNavItem: FC<InlineNavItemProps> = ({
  active = false,
  children,
  ...htmlProps
}) => {
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
