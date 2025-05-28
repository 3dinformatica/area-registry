import { cn } from "@/lib/utils";

interface SectionTileProps {
  label: string;
  href: string;
  active: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function SectionTile(props: SectionTileProps) {
  const { label, href, active, className, onClick } = props;

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "text-sm transition-colors text-muted-foreground hover:text-foreground hover:underline",
        active && "text-foreground font-medium underline",
        className
      )}
    >
      {label}
    </a>
  );
}
