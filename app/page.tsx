"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import registry from "@/registry.json";
import { RegistryItem } from "@/lib/schema";
import ListGroup from "@/components/list-group";
import ContentView from "@/components/content-view";
import { Accordion } from "@/components/ui/accordion";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);

  const uiItems: RegistryItem[] = useMemo(() => {
    return registry.items
      .filter((item) => item.type === "registry:ui")
      .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.title.localeCompare(b.title)) as RegistryItem[];
  }, [search]);

  const blockItems: RegistryItem[] = useMemo(() => {
    return registry.items
      .filter((item) => item.type === "registry:block")
      .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.title.localeCompare(b.title)) as RegistryItem[];
  }, [search]);

  return (
    <main className="h-screen w-screen flex flex-col overflow-hidden">
      <header className="flex flex-col h-fit w-full items-start p-6">
        <h1 className="text-2xl font-bold">3D Registry</h1>
        <p className="text-foreground">
          A collection of 3D components for your projects
        </p>
      </header>
      <div className="flex h-full w-full gap-10">
        <div className="w-1/5 h-full px-4 py-2 gap-4 flex flex-col">
          <input
            placeholder="Search for components..."
            className="bg-accent w-full p-1.5 rounded-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Accordion type="multiple" className="flex flex-col gap-0">
            <ListGroup
              iconName="Folder"
              title="Category: UI"
              items={uiItems}
              selectedItem={selectedItem}
              onSelectedItem={setSelectedItem}
            />
            <ListGroup
              iconName="Folder"
              title="Category: Block"
              items={blockItems}
              selectedItem={selectedItem}
              onSelectedItem={setSelectedItem}
            />
          </Accordion>
        </div>
        <div className="w-[50%] h-full flex flex-col">
          <ContentView selectedItem={selectedItem} />
        </div>
      </div>
    </main>
  );
}
