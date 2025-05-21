"use client";

import { RegistryItem, RegistryItemFile } from "@/lib/schema";
import { extractImports, extractJSX } from "@/lib/utils";
import CopyButton from "./button-copy";
import ContentSection from "./content-section";
import { useMemo, useState, useEffect } from "react";
import React from "react";
import { uiDynamicImports, blockDynamicImports } from "@/lib/import-management";

interface ContentViewProps {
  selectedItem: RegistryItem | null;
}

export default function ContentView(props: ContentViewProps) {
  const { selectedItem } = props;
  const [fileContent, setFileContent] = useState<RegistryItemFile | null>(null);

  const component = useMemo(() => {
    if (!selectedItem) return null;

    const path = selectedItem.files?.find((file) => {
      return file.path.endsWith(".tsx");
    })?.path;

    if (!path) return null;

    // Get the component based on the type
    const Component =
      selectedItem.type === "registry:ui"
        ? uiDynamicImports[path]
        : blockDynamicImports[path];

    if (!Component) return null;

    return <Component />;
  }, [selectedItem]);

  useEffect(() => {
    if (!selectedItem) return;

    const fetchFile = async () => {
      try {
        const res = await fetch(
          process.env.NODE_ENV === "development"
            ? `/r/${selectedItem.name}.json`
            : `https://3dinformatica.github.io/area-registry/r/${selectedItem.name}.json`
        );

        if (!res.ok) {
          console.error("Failed fetching file:", res);
          return;
        }

        const body = await res.json();
        setFileContent(body.files?.at(0));
        console.log(JSON.stringify(body.files?.at(0), null, 2));
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchFile();
  }, [selectedItem]);

  if (!selectedItem) return null;

  return (
    <div className="flex flex-col gap-4 pb-20 items-start h-fit overflow-y-auto flex-1">
      <section className="flex flex-col gap-0 w-full h-fit">
        <h1 className="text-3xl font-semibold">{selectedItem.title}</h1>
        <p>{selectedItem.description}</p>
      </section>
      <section className="flex flex-col gap-10 w-full h-fit mb-20">
        <ContentSection title="Preview">
          {component ? (
            <div className="flex w-full h-full items-center justify-center border-dashed border rounded-sm p-10">
              {component}
            </div>
          ) : (
            <div className="flex w-full h-fit p-10 text-muted-foreground bg-accent items-center justify-center rounded-sm">
              Preview not available
            </div>
          )}
        </ContentSection>
        <ContentSection title="Installation">
          <pre className="bg-accent/60 rounded-md flex w-fit max-w-full p-4 gap-4 items-center">
            <code lang="bash" className="w-fit overflow-x-auto">
              {process.env.NODE_ENV === "development"
                ? `http://localhost:3000/r/${selectedItem.name}.json`
                : `https://3dinformatica.github.io/area-registry/r/${selectedItem.name}.json`}
            </code>
            <CopyButton
              item={selectedItem}
              toCopy={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/r/${selectedItem.name}.json`
                  : `https://3dinformatica.github.io/area-registry/r/${selectedItem.name}.json`
              }
            />
          </pre>
        </ContentSection>
        <ContentSection title="Destination">
          <div className="flex gap-2 items-center">
            {fileContent
              ? fileContent.target?.split("/").map((item, index, array) => (
                  <section key={item} className="flex gap-2 items-center">
                    <pre className="bg-accent rounded-md px-1 py-0.5">
                      {item}
                    </pre>
                    {index < array.length - 1 && (
                      <span className="text-muted-foreground">/</span>
                    )}
                  </section>
                ))
              : "Loading..."}
          </div>
        </ContentSection>
        <ContentSection title="Usage">
          <pre className="bg-accent/60 rounded-md flex flex-col w-fit max-w-full">
            <section className="flex gap-2 items-center justify-between border-b py-2 px-4">
              <p className="text-sm text-muted-foreground">Imports</p>
              <CopyButton
                item={selectedItem}
                toCopy={extractImports(fileContent?.content ?? "")}
              />
            </section>
            <code lang="tsx" className="py-2 px-4">
              {fileContent
                ? extractImports(fileContent.content)
                : "No imports found"}
            </code>
          </pre>
          <pre className="bg-accent/60 rounded-md flex flex-col w-fit max-w-full">
            <section className="flex gap-2 items-center justify-between border-b py-2 px-4">
              <p className="text-sm text-muted-foreground">Content</p>
              <CopyButton
                item={selectedItem}
                toCopy={fileContent?.content ?? ""}
              />
            </section>
            <code className="py-2 px-4 w-full font-mono text-sm" lang="tsx">
              {fileContent ? extractJSX(fileContent.content) : "Loading..."}
            </code>
          </pre>
        </ContentSection>
      </section>
    </div>
  );
}
