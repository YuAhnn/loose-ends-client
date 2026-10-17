export default function WelcomeHero({ user }) {
  if (!user) return null;

  const now = new Date();
  const date = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="flex items-center justify-between gap-4 py-6">
      <div>
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-ink/55">{date}</p>
        <h2 className="mt-1 font-sans text-3xl leading-tight">
          Good {partOfDay(now.getHours())}, {user.username}.
        </h2>
      </div>
      <img
        src="/flork-pfp.jpg"
        className="h-20 w-20 shrink-0 rounded border-2 border-ink object-cover shadow-[4px_4px_0_0_var(--color-ink)]"
      />
    </section>
  );
}

function partOfDay(hour) {
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}