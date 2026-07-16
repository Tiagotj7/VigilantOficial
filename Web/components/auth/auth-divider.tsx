export default function AuthDivider() {
  return (
    <div className="my-3 flex items-center">

      <div className="h-px flex-1 bg-white/10" />

      <span
        className="
          px-4
          text-xs
          uppercase
          tracking-widest
          text-zinc-500
        "
      >
        ou
      </span>

      <div className="h-px flex-1 bg-white/10" />

    </div>
  );
}