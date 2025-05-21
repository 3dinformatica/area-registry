"use client";

import * as React from "react";
import { useState, useEffect, Component } from "react";
import registry from "@/registry.json";
import { CardListItem } from "@/components/card-list-item";
import { blockDynamicImports, uiDynamicImports } from "@/lib/import-management";
import { TabsView } from "@/components/tabs-view";
import { RegistryItem, registrySchema } from "@/lib/schema";
import { Folder } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedUi, setSelectedUi] = useState<number | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  const [selectedComponent, setSelectedComponent] =
    useState<React.ComponentType>();

  const validateRegistry = registrySchema.parse(registry);

  const registryUi: RegistryItem[] = validateRegistry.items
    .filter((item): item is RegistryItem => item.type === "registry:ui")
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  const registryBlocks: RegistryItem[] = validateRegistry.items
    .filter((item): item is RegistryItem => item.type === "registry:block")
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  const emptySearch = () => (
    <div className="flex flex-col px-6 py-0">
      <p className="text-muted-foreground">Nessun risultato trovato</p>
    </div>
  );

  const listStyle = "flex flex-col gap-1 py-2 overflow-y-auto";
  const sectionStyle = "flex flex-row gap-2 items-center text-muted-foreground";

  const fetchComponent = () => {
    console.info("fetchComponent");

    let component: React.ComponentType<any> | undefined;

    if (selectedUi && registryUi[selectedUi]?.files?.[0]?.path) {
      console.info("if selectedUi");
      const componentPath = registryUi.at(selectedUi)?.files?.[0]?.path ?? "";
      component = uiDynamicImports[componentPath];
    }

    if (selectedBlock !== null) {
      console.info("if selectedBlock");
      const componentPath =
        registryBlocks.at(selectedBlock)?.files?.[0]?.path ?? "";
      component = blockDynamicImports[componentPath];
    }

    if (component === undefined) {
      console.info("Component undefined");
      return;
    }

    if (!component) {
      console.error("Component not found");
      setSelectedComponent(undefined);
      return;
    }

    setSelectedComponent(() => component);
  };

  useEffect(() => {
    fetchComponent();
  }, [selectedUi, selectedBlock]);

  return (
    <div className="flex flex-col h-[98dvh] p-6 gap-6 bg-background overflow-hidden">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          3D Informatica UI Registry
        </h1>
        <p className="text-muted-foreground">
          A collection of reusable React components built with shadcn/ui,
          designed to help developers quickly implement common UI patterns and
          features.
        </p>
      </header>
      <main className="flex flex-row gap-10 h-full pb-10 overflow-hidden">
        <div
          key={"component-list"}
          className="flex flex-col w-[16%] overflow-hidden"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a component..."
            className="w-full rounded-sm border-input bg-accent p-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <section className="flex flex-col gap-2 overflow-y-auto pt-2">
            <section key={"registry-list-blocks"} className={listStyle}>
              <div className={sectionStyle}>
                <Folder size={14} />
                <h2 className="text-sm font-medium">Blocks</h2>
              </div>
              {registryBlocks && registryBlocks.length > 0
                ? registryBlocks.map((item, index) => {
                    // console.log("registryBlocks:", item);

                    return (
                      <CardListItem
                        key={index}
                        item={item}
                        selected={selectedBlock === index}
                        onSelect={() => {
                          // console.log("selectedBlock", index);
                          setSelectedBlock(index);
                          setSelectedUi(null);
                        }}
                      />
                    );
                  })
                : emptySearch()}
            </section>
            <section key={"registry-list-ui"} className={listStyle}>
              <div className={sectionStyle}>
                <Folder size={14} />
                <h2 className="text-sm font-medium ">UI</h2>
              </div>
              {registryUi?.length > 0
                ? registryUi.map((item, index) => (
                    <CardListItem
                      key={index}
                      item={item}
                      selected={selectedUi === index}
                      onSelect={() => {
                        setSelectedUi(index);
                        setSelectedBlock(null);
                      }}
                    />
                  ))
                : emptySearch()}
            </section>
          </section>
        </div>
        <div className="flex flex-col gap-2 w-[84%] h-full">
          {selectedComponent ? (
            <TabsView
              key={"component-view"}
              item={
                selectedUi
                  ? registryUi.at(selectedUi)!
                  : selectedBlock
                  ? registryBlocks.at(selectedBlock)!
                  : undefined
              }
              selectedComponent={selectedComponent}
            />
          ) : (
            <div className="flex flex-col gap-2 w-[84%] h-full items-center justify-center text-muted-foreground">
              <p>Component not found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
