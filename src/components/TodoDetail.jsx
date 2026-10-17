import { useState } from 'react';
import { errorMessage } from '../api/client';

export default function TodoDetail({ todo, busy, onToggle, onRename, onDelete, onClose }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [localError, setLocalError] = useState(null);
  const [confirming, setConfirming] = useState(false);

  async function save(e) {
    e.preventDefault();
    const next = title.trim();

    if (next.length < 1 || next.length > 100) {
      setLocalError('Title must be 1–100 characters.');
      return;
    }

    setLocalError(null);
    
    try {
      await onRename(todo.id, next);
      setEditing(false);
    } catch (err) {
      setLocalError(errorMessage(err));
    }
  }

  return (
    <article className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink/60">
          {todo.completed ? 'Done' : 'Open'}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="px-2 font-sans text-lg leading-none border border-ink hover:bg-ink hover:text-paper"
        >
          ×
        </button>
      </div>

      {editing ? (
        <form onSubmit={save} className="mt-4">
          <label htmlFor="pane-title" className="font-sans text-xs uppercase tracking-[0.2em]">
            Title
          </label>
          <input
            id="pane-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            disabled={busy}
            className="mt-1 w-full rounded border border-ink px-3 py-2 font-sans text-xl focus:outline-none focus-within:bg-ink/5"
          />
          {localError && (
            <p className="mt-2 rounded font-sans text-xs border border-ink px-2 py-1">
              {localError}
            </p>
          )}
          <div className="mt-3 flex gap-2">
            <button
              type="submit"
              disabled={busy}
              className="px-3 py-1.5 rounded bg-ink text-paper font-sans text-xs uppercase tracking-[0.2em] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setTitle(todo.title);
              }}
              className="px-3 py-1.5 rounded border border-ink font-sans text-xs uppercase tracking-[0.2em]"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <h2 className="mt-3 font-sans text-3xl leading-tight">{todo.title}</h2>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        
        <button
          type="button"
          disabled={busy}
          onClick={() => onToggle(todo.id)}
          className="px-3 py-1.5 rounded border border-ink font-sans text-xs uppercase tracking-[0.2em] hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
        >
          {todo.completed ? 'Reopen' : 'Complete'}
        </button>

        {!editing && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="px-3 py-1.5 rounded border border-ink font-sans text-xs uppercase tracking-[0.2em] hover:bg-ink hover:text-paper"
          >
            Rename
          </button>
        )}

        <button
          type="button"
          disabled={busy}
          onClick={() => { confirming ? onDelete(todo.id) : setConfirming(true)}}
          onBlur={() => setConfirming(false)}
          className={[
            'px-3 py-1.5 rounded font-sans text-xs uppercase tracking-[0.2em] border border-ink disabled:cursor-not-allowed disabled:opacity-40',
            confirming ? 'bg-ink text-paper' : 'hover:bg-ink hover:text-paper',
          ].join(' ')}
        >
          {confirming ? 'Confirm delete' : 'Delete'}
        </button>

      </div>
    </article>
  );
}
