import { NavLink } from '@/app/components/custom-ui/nav-link';
import { ModeToggle } from './ui/dark-mode-toggle';

export function Navbar() {
  return (
    <nav className="p-8 flex justify-center gap-2">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/categories/new">New category</NavLink>
      <NavLink href="/items/new">New item</NavLink>
      <ModeToggle />
    </nav>
  );
}
