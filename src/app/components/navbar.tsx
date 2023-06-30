import { NavLink } from '@/app/components/custom-ui/nav-link';

export function Navbar() {
  return (
    <nav className="p-8 flex justify-center gap-2">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/categories/new">New category</NavLink>
      <NavLink href="/items/new">New item</NavLink>
    </nav>
  );
}
