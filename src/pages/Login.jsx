import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth';
import { errorMessage } from '../api/client';

export default function Login() {
  const token = useAuthStore((s) => s.token);
  const signIn = useAuthStore((s) => s.signIn);
  const signUp = useAuthStore((s) => s.signUp);

  const [mode, setMode] = useState('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (token) return <Navigate to="/" replace />;

  function switchMode() {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError('');
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode === 'signin') {
         await signIn(username, password);
      } else {
         await signUp(username, password);
      }
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col border-x border-ink/15 bg-paper px-4 text-ink sm:px-8">
      <main className="flex flex-1 items-center">
        <div className="grid w-full gap-10 py-16 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="mt-3 font-sans text-6xl leading-[0.95] sm:text-8xl">
              Loose
              <br />
              Ends
            </h1>
            <p className="ml-2 mt-6 max-w-sm font-sans text-xl leading-snug text-ink/70">
              For the things you keep saying you’ll do later.
            </p>
            <div className="mt-8 w-full max-w-md rounded-md border border-ink bg-paper p-6 sm:p-8">
              <h2 className="font-sans text-xs uppercase tracking-[0.25em]">
                {mode === 'signin' ? 'Sign in' : 'Create account'}
              </h2>
              <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                <label className="grid gap-1">
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-ink/60">
                    Username
                  </span>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                    autoFocus
                    className="rounded border border-ink bg-transparent px-3 py-2 font-sans text-sm focus:outline-ink"
                  />
                </label>
                <label className="grid gap-1">
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-ink/60">
                    Password
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    minLength={mode === 'signin' ? undefined : 8}
                    required
                    className="rounded border border-ink bg-transparent px-3 py-2 font-sans text-sm focus:outline-ink"
                  />
                </label>
                {error && (
                  <p className="font-sans text-xs text-ink/70">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded bg-ink py-3 font-sans text-xs uppercase tracking-[0.25em] text-paper disabled:opacity-50"
                >
                  {busy ? '…' : mode === 'signin' ? 'Sign in' : 'Create account'}
                </button>
              </form>
              <button
                type="button"
                onClick={switchMode}
                className="mt-4 font-sans text-[11px] uppercase tracking-[0.2em] text-ink/60 underline underline-offset-4 hover:text-ink"
              >
                {mode === 'signin' ? 'No account yet? Create one' : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
          <figure className="w-full self-center">
            <img
              src="/flork-disappointed.png"
              alt="Flork looking disappointed at ur unfinished todos"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </main>
    </div>
  );
}