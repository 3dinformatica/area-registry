import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { RegistryItem } from "@/lib/schema";
import { CardListItem } from "./card-list-item";
import { AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface ListGroupProps {
  iconName: keyof typeof LucideIcons;
  title: string;
  items: RegistryItem[];
  selectedItem: RegistryItem | null;
  onSelectedItem: (item: RegistryItem) => void;
}

export default function ListGroup(props: ListGroupProps) {
  const { iconName, title, items, selectedItem, onSelectedItem } = props;
  const Icon = LucideIcons[iconName] as LucideIcon;

  return (
    <AccordionItem value={title} className="flex flex-col gap-1 w-full h-fit items-start justify-start border-none">
      <AccordionTrigger className="py-1 cursor-pointer">
        <div className="flex gap-2 items-center justify-start text-muted-foreground text-sm font-medium">
        <Icon size={14} />
        <p>{title}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-0">
        {items.map((item) => (
          <CardListItem
            key={item.name}
            item={item}
            selected={selectedItem?.name === item.name}
            onSelect={() => onSelectedItem(item)}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
