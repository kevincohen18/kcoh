export function LogoRow({ names }: { names: string[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
      {names.map((name) => (
        <li
          key={name}
          className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}
