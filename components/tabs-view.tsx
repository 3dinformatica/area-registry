"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";
import CardCode from "./card-code";

interface TabsViewProps {
  title: string;
  path: string;
  selectedComponent: React.ComponentType<{}> | undefined;
}

export function TabsView({ title, path, selectedComponent }: TabsViewProps) {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [fileContent, setFileContent] = useState<string>("");

  const fetchFile = async () => {
    console.log("path", path);

    if (!path) return;

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
      className="flex flex-col gap-2 w-full h-full items-start justify-start"
    >
      <div className="flex gap-2 items-center justify-between w-full pb-2 border-b">
        <section
          key={"actions"}
          className="flex flex-row gap-2.5 items-center justify-center"
        >
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </section>
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent
        value="preview"
        className="flex w-full h-full items-center justify-center  p-6"
      >
        {selectedComponent && React.createElement(selectedComponent)}
      </TabsContent>
      <TabsContent
        value="code"
        className="w-full h-full overflow-y-auto pb-10 pr-4"
      >
        <CardCode path={path} fileContent={fileContent} />
      </TabsContent>
    </Tabs>
  );
}
