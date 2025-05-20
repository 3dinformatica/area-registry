import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React from "react";

export interface AreaSelectProps {
  value?: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

export function AreaSelect(props: AreaSelectProps) {
  const {
    value = "option1",
    options = ["option1", "option2", "option3"],
    className,
    onChange,
  } = props;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "h-8 min-w-[12dvw] max-w-[16dvw] border-primary-foreground/40 py-0 text-sm font-semibold text-primary-foreground hover:border-primary-foreground/60 hover:bg-primary-foreground/10",
          className
        )}
      >
        {value == undefined ? (
          <p className="text-muted-foreground">option 1</p>
        ) : (
          <SelectValue />
        )}
      </SelectTrigger>
      <SelectContent>
        {options.map((item, index) => (
          <SelectItem key={index} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
