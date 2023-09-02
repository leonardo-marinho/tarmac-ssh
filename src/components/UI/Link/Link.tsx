import { AnchorHTMLAttributes, FC, PropsWithChildren } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import NextLink from 'next/link';
import classNames from 'classnames';

interface LinkProps
  extends PropsWithChildren,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
}

const Link: FC<LinkProps> = ({ children, href, external, ...htmlProps }) => {
  return external ? (
    <a
      {...htmlProps}
      className={classNames('flex items-center gap-2', htmlProps.className)}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <FiExternalLink />
    </a>
  ) : (
    <NextLink {...htmlProps} href={href}>
      {children}
    </NextLink>
  );
};

export default Link;
