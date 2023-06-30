import { Button } from '@/app/components/ui/button';
import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

interface NavLinkProps extends LinkProps {}

export function NavLink({
  children,
  ...props
}: NavLinkProps & PropsWithChildren) {
  return (
    <Button asChild variant={'ghost'}>
      <Link {...props}>{children}</Link>
    </Button>
  );
}
