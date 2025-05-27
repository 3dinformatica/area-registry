"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
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
  };

  // Reset copied state when debounced value changes to false
  if (debouncedCopied === false && copied === true) {
    setCopied(false);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className={cn(
        "size-5 p-0 rounded-sm transition-all duration-240",
        copied && "bg-foreground/30 text-foreground hover:bg-foreground/40"
      )}
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
    </Button>
  );
}
