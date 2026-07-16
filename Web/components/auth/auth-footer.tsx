import Link from "next/link";

interface Props {
  text: string;
  action: string;
  href: string;
}

export default function AuthFooter({
  text,
  action,
  href,
}: Props) {
  return (
    <div className="mt-4 text-center">

      <p className="text-sm text-zinc-400">

        {text}{" "}

        <Link
          href={href}
          className="
            font-semibold
            text-cyan-400
            transition
            hover:text-cyan-300
          "
        >
          {action}
        </Link>

      </p>

    </div>
  );
}