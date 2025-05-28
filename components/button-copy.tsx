"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useDebounce } from "@/registry/hooks/debounce/debounce";

interface CopyButtonProps {
  toCopy: string;
}

export default function CopyButton(props: CopyButtonProps) {
  const { toCopy } = props;

  const [copied, setCopied] = useState(false);
  const debouncedCopied = useDebounce(copied, 2000);

  const handleCopy = () => {
    navigator.clipboard.writeText(toCopy);
    setCopied(true);
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Reset copied state when debounced value changes
  useEffect(() => {
    if (debouncedCopied === false) {
      setCopied(false);
    }
  }, [debouncedCopied]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className={cn(
        "size-5 p-0 rounded-sm transition-all duration-300 ease-in-out text-muted-foreground hover:bg-accent-foreground cursor-pointer",
        copied && "bg-foreground/30 text-foreground hover:bg-foreground/40"
      )}
    >
      <div className="relative w-3 h-3">
        <Check className={cn("size-3 absolute transition-all duration-300 ease-in-out", copied ? "opacity-100 scale-100" : "opacity-0 scale-50")} />
        <Copy className={cn("size-3 absolute transition-all duration-300 ease-in-out", copied ? "opacity-0 scale-50" : "opacity-100 scale-100")} />
      </div>
    </Button>
  );
}
