"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { RegistryItem } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CopyButtonProps {
  item: RegistryItem;
}

export default function CopyButton(props: CopyButtonProps) {
  const { item } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.files?.at(0)?.content ?? "");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className={cn(
        "size-5 p-0 rounded-sm transition-all duration-240",
        copied && "bg-green-500/50 text-foreground hover:bg-green-500/60"
      )}
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
    </Button>
  );
}
