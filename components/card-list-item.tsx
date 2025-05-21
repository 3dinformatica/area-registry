import { cn } from "@/lib/utils";
import { RegistryItem } from "@/lib/schema";

interface CardListItemProps {
  item: RegistryItem;
  onSelect: () => void;
  selected: boolean;
}

export function CardListItem({ item, selected, onSelect }: CardListItemProps) {
  return (
    <div
      onClick={() => onSelect()}
      className={`w-full flex items-center gap-2 hover:cursor-pointer text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        selected ? "bg-card border-primary" : ""
      }`}
    >
      <section
        className={cn(
          "flex flex-row gap-2 items-center hover:underline",
          selected ? "text-primary" : "text-foreground"
        )}
      >
        <div
          className={cn(
            "size-2 rounded-full mr-1 p-0",
            selected ? "bg-primary" : "bg-transparent"
          )}
        />
        <h2
          className={cn(
            "text-sm font-medium",
            // selected ? "text-primary" : "text-foreground"
          )}
        >
          {item.title}
        </h2>
      </section>
      <p className="text-sm font-light text-muted-foreground">{item.name}</p>
    </div>
  );
}
