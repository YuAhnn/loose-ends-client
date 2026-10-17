export default function TodoItem({ todo, selected, onSelect, onToggle, disabled }) {
  const done = todo.completed;
  return (
    <li
      id={`entry-${todo.id}`}
      className={[
        'group flex items-baseline gap-4 border-b border-ink/15 py-4',
        selected ? 'border-l-4 border-l-ink pl-3' : '',
      ].join(' ')}
    >
      <button type="button" onClick={onSelect} className="flex-1 text-left">
        <span className="relative font-sans text-2xl sm:text-3xl leading-tight">
          <span className={done ? 'text-ink/45' : ''}>{todo.title}</span>
          {done && <span className="absolute left-0 top-1/2 h-0.5 w-full bg-ink/70" />}
        </span>
        <span className="sr-only">{done ? ' (completed)' : ' (open)'}</span>
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={onToggle}
        className={[
          'flex h-7 w-7 shrink-0 items-center justify-center rounded border border-ink font-sans',
          done ? 'bg-ink text-paper' : 'bg-paper hover:bg-ink hover:text-paper',
          disabled ? 'cursor-not-allowed opacity-40' : '',
        ].join(' ')}
      >
        {done ? '■' : '□'}
      </button>
    </li>
  );
}