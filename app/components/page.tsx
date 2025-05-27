"use client";

import ComponentContentView from "@/components/content-view-components";
import ListGroup from "@/components/list-group";
import RegistryBreadcrumb from "@/components/registry-breadcrumb";
import { Searchbar } from "@/components/searchbar";
import { Accordion } from "@/components/ui/accordion";
import { RegistryItem } from "@/lib/schema";
import registry from "@/registry";
import { useMemo, useState } from "react";

export default function ComponentsPage() {
  const [query, setQuery] = useState("");

  const uiItems: RegistryItem[] = useMemo(() => {
    return registry.items
      .filter((item) => item.type === "registry:ui")
      .filter((item) => item.title!.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.title!.localeCompare(b.title!)) as RegistryItem[];
  }, [query]);

  const blockItems: RegistryItem[] = useMemo(() => {
    return registry.items
      .filter((item) => item.type === "registry:block")
      .filter((item) => item.title!.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.title!.localeCompare(b.title!)) as RegistryItem[];
  }, [query]);

  const [openAccordion, setOpenAccordion] = useState<string[]>(["Block", "UI"]);
  const [selectedItem, setSelectedItem] = useState<RegistryItem>(uiItems[0]);

  return (
    <main className="h-full w-full flex overflow-hidden gap-6">
      <div className="flex h-full w-1/6 flex-col gap-2 overflow-hidden ">
        <section className="w-full pl-0 pr-2">
          <Searchbar
            className="w-full"
            value={query}
            onChange={(value) => setQuery(value)}
          />
        </section>
        <Accordion
          type="multiple"
          className="flex flex-col gap-0"
          value={openAccordion}
          onValueChange={(value) => setOpenAccordion(value)}
        >
          <ListGroup
            iconName="Folder"
            title="Block"
            options={blockItems}
            selectedItem={selectedItem}
            onSelectedItem={setSelectedItem}
          />
          <ListGroup
            iconName="Folder"
            title="UI"
            options={uiItems}
            selectedItem={selectedItem}
            onSelectedItem={setSelectedItem}
          />
        </Accordion>
      </div>
      <div className="h-full flex flex-1 flex-col gap-6">
        <RegistryBreadcrumb />
        <ComponentContentView registryItem={selectedItem} />
      </div>
    </main>
  );
}
