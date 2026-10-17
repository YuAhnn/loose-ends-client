export default function StatsHeader({ items }) {
  const done = items.filter((t) => t.completed).length;
  const cells = [
    { label: 'Total', value: items.length },
    { label: 'Open', value: items.length - done },
    { label: 'Done', value: done },
  ];

  return (
    <header className="border-b border-ink">
      <dl className="grid grid-cols-3 gap-px bg-ink border-y border-ink">
        {cells.map((c) => (
          <div key={c.label} className="bg-paper px-4 py-6 sm:py-10">
            <dt className="font-sans text-[11px] tracking-[0.25em] uppercase">{c.label}</dt>
            <dd className="font-sans leading-none text-6xl sm:text-8xl tabular-nums">
              {c.value}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}