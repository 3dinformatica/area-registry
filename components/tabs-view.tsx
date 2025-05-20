"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import React from "react";
import CardCode from "./card-code";

interface TabsViewProps {
  title: string;
  path: string;
  selectedComponent: React.ComponentType | undefined;
}

export function TabsView({ title, path, selectedComponent }: TabsViewProps) {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [fileContent, setFileContent] = useState<string>("");

  const fetchFile = async () => {
    console.log("path", path);

    if (!path) return;

    try {
      // Get the base path for GitHub Pages
      const isDevelopment = process.env.NODE_ENV === 'development';
      const basePath = isDevelopment ? '' : process.env.NEXT_PUBLIC_BASE_PATH || '';
      
      // Convert the path to the JSON file path
      const componentName = path.split("/").pop()?.replace(".tsx", "");
      const jsonPath = `${basePath}/r/${componentName}.json`;
      
      console.log("Fetching from:", jsonPath);
      const response = await fetch(jsonPath, {
        // Add cache control to prevent stale data
        cache: 'no-store',
        // Add headers to ensure proper content type
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();

      // Get the content from the first file in the files array
      const content = data.files[0].content;
      setFileContent(content);
    } catch (error) {
      console.error("Error occurred during fetching component code:", error);
      setFileContent("Error loading component code. Please try refreshing the page.");
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
        {selectedComponent ? React.createElement(selectedComponent) : <p>Component not found</p>}
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
