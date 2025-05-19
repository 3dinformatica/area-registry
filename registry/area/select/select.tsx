import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

interface AreaSelectProps<T> {
    value: string;
    options: T[];
    optionKey: keyof T;
    onChange: (value: string) => void;
    className?: string;
  }
  
  const AreaSelect = React.forwardRef(<T,>(props: AreaSelectProps<T>, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { className, options, value, onChange, optionKey, ...rest } = props;

    return (
      <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-8 min-w-[12dvw] max-w-[16dvw] border-primary-foreground/40 py-0 text-sm font-semibold text-primary-foreground hover:border-primary-foreground/60 hover:bg-primary-foreground/10">
        {value == undefined && <p className="text-muted-foreground">-</p>}
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((item, index) => (
          <SelectItem key={index} value={String(item[optionKey])}>
            {String(item[optionKey])}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    )
  })

  AreaSelect.displayName = "AreaSelect";
  export { AreaSelect };