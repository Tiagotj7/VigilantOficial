"use client";

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({
  password,
}: PasswordStrengthProps) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    {
      label: "Muito fraca",
      color: "bg-red-500",
    },
    {
      label: "Fraca",
      color: "bg-orange-500",
    },
    {
      label: "Boa",
      color: "bg-yellow-500",
    },
    {
      label: "Forte",
      color: "bg-cyan-500",
    },
    {
      label: "Excelente",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="mt-1.5">

      <div className="flex gap-2">

        {Array.from({ length: 4 }).map((_, index) => (

          <div
            key={index}
            className={`
              h-2
              flex-1
              rounded-full
              transition-all
              ${
                index < score
                  ? levels[score].color
                  : "bg-zinc-800"
              }
            `}
          />

        ))}

      </div>

      <p className="mt-2 text-xs text-zinc-500">

        {password.length === 0
          ? "Digite uma senha"
          : levels[score].label}

      </p>

    </div>
  );
}