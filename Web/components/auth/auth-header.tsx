import { Logo } from "@/components/brand/logo";

interface Props {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-4 text-center">

      <div className="flex justify-center">

        <Logo />

      </div>

      <h1
        className="
          mt-3
          text-2xl
          font-black
          text-white
        "
      >
        {title}
      </h1>

      <p
        className="
          mt-1.5
          text-sm
          leading-6
          text-zinc-400
        "
      >
        {subtitle}
      </p>

    </div>
  );
}