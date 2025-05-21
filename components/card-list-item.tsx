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
      className={cn(
        "flex items-center py-0.5 gap-2 hover:underline hover:cursor-pointer w-fit text-foreground font-medium",
        selected && "text-primary font-medium" 
      )}
      onClick={onSelect}
    >
      <div
        className={cn(
          "size-1.5 bg-primary ml-2 mr-0",
          selected ? "bg-primary" : "bg-transparent"
        )}
      />
      <p>{item.title}</p>
    </div>
  );
}
