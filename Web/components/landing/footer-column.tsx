interface FooterColumnProps {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export default function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="
                text-zinc-400
                transition-colors
                hover:text-white
              "
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}