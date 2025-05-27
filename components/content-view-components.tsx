"use client";

import { RegistryItem, RegistryItemFile } from "@/lib/schema";
import { extractImports, extractJSX } from "@/lib/utils";
import CopyButton from "./button-copy";
import { useMemo, useState, useEffect } from "react";
import React from "react";
import { uiDynamicImports, blockDynamicImports } from "@/lib/import-management";
import ContentSection from "./content-view-section";

interface ContentViewProps {
  registryItem: RegistryItem | null;
}

export default function ComponentContentView(props: ContentViewProps) {
  const { registryItem } = props;
  const [fileContent, setFileContent] = useState<RegistryItemFile | null>(null);

  const component = useMemo(() => {
    if (!registryItem) return null;

    const path = registryItem.files?.find((file) => {
      return file.path.endsWith(".tsx");
    })?.path;

    if (!path) return null;

    // Get the component based on the type
    const Component =
      registryItem.type === "registry:ui"
        ? uiDynamicImports[path]
        : blockDynamicImports[path];

    if (!Component) return null;

    return <Component />;
  }, [registryItem]);

  useEffect(() => {
    if (!registryItem) return;

    const fetchFile = async () => {
      try {
        const res = await fetch(
          process.env.NODE_ENV === "development"
            ? `/r/${registryItem.name}.json`
            : `https://3dinformatica.github.io/area-registry/r/${registryItem.name}.json`
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
  }, [registryItem]);

  if (!registryItem) return null;

  const installationCmd = `pnpm dlx shadcn@latest add ${process.env.NODE_ENV === "development"
                ? `http://localhost:3000/r/${registryItem.name}.json`
                : `https://3dinformatica.github.io/area-registry/r/${registryItem.name}.json`
              }`

  return (
    <div className="flex flex-col gap-4 pb-20 items-start h-fit overflow-y-auto flex-1">
      <section className="flex flex-col gap-0 w-full h-fit">
        <h1>{registryItem.title}</h1>
        <p>{registryItem.description}</p>
      </section>
      <section className="flex flex-col gap-10 w-full h-fit mb-20">
        <ContentSection title="Preview">
          <div className="flex w-full h-full items-center justify-center border-dashed border rounded-sm p-10">
            {component}
          </div>
        </ContentSection>
        <ContentSection title="Installation">
          <pre className="bg-accent/60 rounded-md flex w-fit max-w-full p-4 gap-4 items-center">
            <code lang="bash" className="w-fit overflow-x-auto">
              {installationCmd}
            </code>
            <CopyButton
              item={registryItem}
              toCopy={installationCmd}
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
                item={registryItem}
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
                item={registryItem}
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
