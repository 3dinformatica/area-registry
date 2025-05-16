"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CheckIcon, CopyIcon, File } from "lucide-react";
import { Button } from "@/registry/new-york/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface TabsViewProps {
  title: string;
  path: string;
  selectedComponent: React.ComponentType<{}> | null;
}

export function TabsView({ title, path, selectedComponent }: TabsViewProps) {
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<"preview" | "code">("preview");
  const [fileContent, setFileContent] = useState<string>("");

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const fetchFile = async () => {
    try {
      // Convert the path to the JSON file path
      const jsonPath = `/r/${path.split("/").pop()?.replace(".tsx", "")}.json`;
      const response = await fetch(jsonPath);
      const data = await response.json();

      // Get the content from the first file in the files array
      const content = data.files[0].content;
      setFileContent(content);
    } catch (error) {
      console.error("Error fetching component code:", error);
      setFileContent("Error loading component code");
    }
  };

  useEffect(() => {
    fetchFile();
  }, [path]);

  return (
    <Tabs
      defaultValue={view}
      onValueChange={(value) => setView(value as "preview" | "code")}
      className="flex flex-col gap-2 max-w-full w-[80%] items-start justify-start"
    >
      <div className="flex gap-2 items-center justify-between w-full pb-2 border-b">
        <section
          key={"actions"}
          className="flex flex-row gap-2.5 items-center justify-center"
        >
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <Button
            className={cn(
              "px-1 py-1.5 border rounded-sm h-fit w-fit cursor-pointer",
              copied && "bg-green-500/10 text-green-500 border-green-500"
            )}
            onClick={() => handleCopy()}
          >
            {copied ? <CheckIcon size={20} /> : <CopyIcon size={20} />}
            <p className="text-xs">{copied ? "Copied" : "Copy"}</p>
          </Button>
        </section>
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent
        value="preview"
        className="flex w-full h-full items-center justify-center"
      >
        {selectedComponent && React.createElement(selectedComponent)}
      </TabsContent>
      <TabsContent value="code" className="w-full h-full">
        <div className="flex flex-col w-full h-full rounded-md border border-dashed bg-foreground">
          <section className="flex gap-2 text-sm p-2.5 text-muted-foreground border-b">
            <File size={16} />
            <span>{path}</span>
          </section>
          <pre className="w-full h-full p-6 overflow-y-auto">
            <code lang="json">{fileContent}</code>
          </pre>
        </div>
      </TabsContent>
    </Tabs>
  );
}
