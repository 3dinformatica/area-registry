"use client";

import { Check, Code2, Command, File } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CardCodeProps {
  path: string;
  fileContent: string;
}

export default function CardCode({ path, fileContent }: CardCodeProps) {
  const [copied, setCopied] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 800);
  };

  const handleCopyCommand = () => {
    const componentName = path.split("/").pop()?.replace(".tsx", "");
    const command = `pnpm dlx shadcn@latest add https://3dinformatica.github.io/registry/r/${componentName}.json`;
    navigator.clipboard.writeText(command);
    setCopiedCommand(true);
    setTimeout(() => {
      setCopiedCommand(false);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full h-fit rounded-md border border-dashed bg-foreground ">
      <section className="flex gap-2 text-sm p-2.5 text-muted-foreground border-b items-center justify-between">
        <div className="flex gap-2 items-center">
          <File size={16} />
          <span>{path}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            className={cn(
              "px-1 py-1.5 border rounded-sm h-fit w-fit cursor-pointer",
              copied && "bg-green-500/10 text-green-500 border-green-500"
            )}
            onClick={() => handleCopy()}
          >
            {copied ? <Check size={16} /> : <Code2 size={16} />}
            <p className="text-xs">Code</p>
          </Button>
          <Button
            className={cn(
              "px-1 py-1.5 border rounded-sm h-fit w-fit cursor-pointer",
              copiedCommand && "bg-green-500/10 text-green-500 border-green-500"
            )}
            onClick={() => handleCopyCommand()}
          >
            {copiedCommand ? <Check size={16} /> : <Command size={16} />}
            <p className="text-xs">Import</p>
          </Button>
        </div>
      </section>
      <pre className="w-full h-fit p-6">
        <code lang="tsx">{fileContent}</code>
      </pre>
    </div>
  );
}
