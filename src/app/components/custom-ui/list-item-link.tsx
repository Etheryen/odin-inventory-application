import { Button } from '@/app/components/ui/button';
import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

interface ListItemLinkProps extends LinkProps {}

export function ListItemLink({
  children,
  ...props
}: ListItemLinkProps & PropsWithChildren) {
  return (
    <Button asChild variant={'outline'}>
      <Link {...props}>{children}</Link>
    </Button>
  );
}
