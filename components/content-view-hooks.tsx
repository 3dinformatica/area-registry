"use client";

import { RegistryItem, RegistryItemFile } from "@/lib/schema";
import CopyButton from "./button-copy";
import ContentSection from "./content-view-section";
import { useState, useEffect } from "react";
import React from "react";

interface HooksContentViewProps {
  registryItem: RegistryItem | null;
}

export default function HooksContentView(props: HooksContentViewProps) {
  const { registryItem } = props;
  const [fileContent, setFileContent] = useState<RegistryItemFile | null>(null);

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

  return (
    <div className="flex flex-col gap-6 pb-20 items-start h-fit overflow-y-auto flex-1">
      <h1>{registryItem.title}</h1>
      <section className="flex flex-col gap-10 w-full h-fit mb-20">
        <ContentSection title="Description">
          <p>{registryItem.description}</p>
        </ContentSection>
        <ContentSection title="Installation">
          <pre className="bg-accent/60 rounded-md flex w-fit max-w-full p-4 gap-4 items-center">
            <code lang="bash" className="w-fit overflow-x-auto">
              {`pnpm dlx shadcn@latest add ${process.env.NODE_ENV === "development"
                ? `http://localhost:3000/r/${registryItem.name}.json`
                : `https://3dinformatica.github.io/area-registry/r/${registryItem.name}.json`
              }`}
            </code>
            <CopyButton
              item={registryItem}
              toCopy={
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/r/${registryItem.name}.json`
                  : `https://3dinformatica.github.io/area-registry/r/${registryItem.name}.json`
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
      </section>
    </div>
  );
}
