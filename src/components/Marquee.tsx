export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items]
  return (
    <section className="border-y border-white/5 bg-ink-900/40 py-6 overflow-hidden">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className="font-mono text-sm text-white/50 tracking-widest uppercase">
            {item}
            <span className="ml-12 text-electric-500/60">/</span>
          </span>
        ))}
      </div>
    </section>
  )
}
