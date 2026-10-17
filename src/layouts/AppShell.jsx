import { LogOut } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import ThemeToggle from '../theme/ThemeToggle';
import { useAuthStore } from '../stores/auth';

export default function AppShell() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col border-x border-ink/15 bg-paper px-4 text-ink sm:px-8">
      <a href="#todos" className="sr-only focus:not-sr-only focus:absolute focus:rounded focus:bg-paper focus:p-2">
        Skip to loose ends
      </a>
      <nav className="flex items-center justify-between py-4">
        <NavLink to="/" className="flex items-center gap-2 font-sans text-lg font-bold">
          <img
            src="/flork.jpg"
            className="h-8 w-8 rounded-full border border-ink object-cover"
          />
          Loose Ends
        </NavLink>
        <div className="flex items-center gap-3 font-sans text-xs">
          <ThemeToggle
            title="Toggle color theme"
            className="flex h-8 w-8 items-center justify-center rounded border border-ink hover:bg-ink hover:text-paper motion-safe:transition-colors"
          />
          {user && <span className="sr-only">Signed in as {user.username}</span>}
          <button
            type="button"
            onClick={logout}
            title="Sign out"
            className="flex h-8 w-8 items-center justify-center rounded border border-ink hover:bg-ink hover:text-paper motion-safe:transition-colors"
          >
            <LogOut size={17} strokeWidth={1.8} />
          </button>
        </div>
      </nav>

      <main className="flex-1 pb-16">
        <Outlet />
      </main>
    
    </div>
  );
}