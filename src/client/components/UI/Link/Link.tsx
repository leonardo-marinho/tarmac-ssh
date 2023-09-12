import classNames from 'classnames';
import NextLink from 'next/link';
import { AnchorHTMLAttributes, FC, PropsWithChildren } from 'react';
import { FiExternalLink } from 'react-icons/fi';

interface LinkProps extends PropsWithChildren, AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
  href: string;
}

const Link: FC<LinkProps> = ({ children, external, href, ...htmlProps }) => {
  return external ? (
    <a
      {...htmlProps}
      className={classNames('flex items-center gap-2', htmlProps.className)}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
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
