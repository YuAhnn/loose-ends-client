import { useState } from 'react';
import { errorMessage } from '../api/client';

export default function TodoInput({ busy, onCreate }) {
  const [title, setTitle] = useState('');
  const [localError, setLocalError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    const next = title.trim();

    if (next.length < 1 || next.length > 100) {
      setLocalError('Give it 1–100 characters.');
      return;
    }

    setLocalError(null);

    try {
      await onCreate(next);
      setTitle('');
    } catch (err) {
      setLocalError(errorMessage(err));
    }
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor="inscribe" className="sr-only">
        New todo title
      </label>
      <div className="flex items-stretch overflow-hidden rounded border border-ink focus-within:bg-ink/5">
      
        <input
          id="inscribe"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo…"
          maxLength={100}
          disabled={busy}
          className="w-full bg-transparent px-3 py-2 font-sans text-sm placeholder:text-ink/40 focus:outline-none disabled:cursor-not-allowed"
        />

        <button
          type="submit"
          disabled={busy}
          className="shrink-0 border-l border-ink bg-ink px-4 font-sans text-xs uppercase tracking-[0.2em] text-paper disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? '…' : 'Add'}
        </button>

      </div>
      {localError && (
        <p className="mt-2 inline-block rounded border border-ink px-2 py-1 font-sans text-xs">
          {localError}
        </p>
      )}
    </form>
  );
}
