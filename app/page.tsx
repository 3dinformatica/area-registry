"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import registry from "@/registry.json";
import { RegistryItem } from "@/lib/schema";
import ListGroup from "@/components/list-group";
import ContentView from "@/components/content-view";
import { Accordion } from "@/components/ui/accordion";
import * as LucideIcons from "lucide-react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [query, setQuery] = useState("");
  const [openAccordion, setOpenAccordion] = useState<string[]>(["Block", "UI"]);
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);

  const uiItems: RegistryItem[] = useMemo(() => {
    return registry.items
      .filter((item) => item.type === "registry:ui")
      .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.title.localeCompare(b.title)) as RegistryItem[];
  }, [query]);

  const blockItems: RegistryItem[] = useMemo(() => {
    return registry.items
      .filter((item) => item.type === "registry:block")
      .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.title.localeCompare(b.title)) as RegistryItem[];
  }, [query]);

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
          <div className="relative w-full">
            <input
              value={query}
              placeholder="Search for components..."
              className="bg-accent w-full p-1.5 pl-8 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              onChange={(e) => {
                setQuery(e.target.value);
                setOpenAccordion(["Block", "UI"]);
              }}
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuery("")}
              className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 size-5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive/80"
            >
              <X size={16} />
            </Button>
          </div>
          <Accordion
            type="multiple"
            className="flex flex-col gap-0"
            value={openAccordion}
            onValueChange={(value) => setOpenAccordion(value)}
          >
            <ListGroup
              iconName="Folder"
              title="Block"
              items={blockItems}
              selectedItem={selectedItem}
              onSelectedItem={setSelectedItem}
            />
            <ListGroup
              iconName="Folder"
              title="UI"
              items={uiItems}
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
