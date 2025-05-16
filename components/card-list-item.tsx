import { cn } from "@/lib/utils";

type RegistryItem = {
  title: string;
  description: string;
  component: React.ReactNode;
}

interface CardListItemProps {
  item: RegistryItem;
  onSelect: () => void;
  selected: boolean;
}

export function CardListItem({
  item,
  selected,
  onSelect,
}: CardListItemProps) {
  return (
    <div
      onClick={() => onSelect()}
      className={`w-full flex items-center hover:underline hover:cursor-pointer text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        selected ? "bg-card border-primary" : ""
      }`}
    >
      <div
        className={cn(
          "size-2 rounded-full",
          selected ? "bg-blue-500" : "bg-transparent"
        )}
      />
      <h2
        className={`text-base font-medium sm:pl-3 ${
          selected ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {item.title}
      </h2>
    </div>
  );
}
