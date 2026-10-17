import { useEffect } from 'react';
import StatsHeader from '../components/StatsHeader.jsx';
import TodoDetail from '../components/TodoDetail.jsx';
import TodoInput from '../components/TodoInput.jsx';
import TodoItem from '../components/TodoItem.jsx';
import WelcomeHero from '../components/WelcomeHero.jsx';
import { useAuthStore } from '../stores/auth';
import { useTodosStore } from '../stores/todo';

export default function Todos() {
  const { user } = useAuthStore();
  const {
    items, selectedId, busy, error, refresh,
    select, create, toggle, rename, remove, dismissError,
  } = useTodosStore();

  useEffect(() => {
    refresh();
  }, [refresh]);

  const selected = items.find((t) => t.id === selectedId) || null;
  const detail = selected && (
    <TodoDetail
      key={selected.id}
      todo={selected}
      busy={busy}
      onToggle={toggle}
      onRename={rename}
      onDelete={remove}
      onClose={() => select(null)}
    />
  );

  async function handleCreate(title) {
    const todo = await create(title);
    if (todo) select(todo.id);
  }

  return (
    <>
      <WelcomeHero user={user} />
      <StatsHeader items={items} />

      <div className="mt-6">
        <TodoInput busy={busy} onCreate={handleCreate} />
      </div>

      {error && (
        <div className="mt-6 flex items-center justify-between rounded border border-ink bg-ink px-3 py-2 text-paper">
          <p className="font-sans text-xs">{error}</p>
          <button type="button" onClick={dismissError} className="px-2 font-sans text-sm">
            ×
          </button>
        </div>
      )}

      <div id="todos" className="mt-4 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <section>
          {busy && items.length === 0 ? (
            <ol>
              {[0, 1, 2].map((i) => (
                <li key={i} className="border-b border-ink/15 py-4">
                  <div className="h-8 w-2/3 bg-ink/10" />
                </li>
              ))}
            </ol>
          ) : items.length === 0 ? (
            <div className="rounded-md border border-dashed border-ink/40 px-6 py-16 text-center">
              <p className="font-sans text-3xl italic">No todos yet.</p>
              <p className="mt-2 font-sans text-xs text-ink/60">Add one using the box above.</p>
            </div>
          ) : (
            <ol>
              {items.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  selected={todo.id === selectedId}
                  onSelect={() => select(todo.id)}
                  onToggle={() => toggle(todo.id)}
                  disabled={busy}
                />
              ))}
            </ol>
          )}
        </section>

        <aside className="hidden lg:block">
          <div className="flex h-full flex-col rounded-md border border-ink bg-paper p-4">
            {detail || (
              <p className="m-auto text-center font-sans text-xs leading-relaxed text-ink/55">
                Select a todo to see details.
              </p>
            )}
          </div>
        </aside>
      </div>

      {detail && (
        <div className="fixed inset-0 z-10 lg:hidden">
          <div className="absolute inset-0 bg-veil" onClick={() => select(null)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85svh] overflow-y-auto rounded-t-xl border-t-2 border-ink bg-paper p-5">
            {detail}
          </div>
        </div>
      )}
    </>
  );
}