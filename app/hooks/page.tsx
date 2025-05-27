"use client";

import HooksContentView from "@/components/content-view-hooks";
import ListGroup from "@/components/list-group";
import RegistryBreadcrumb from "@/components/registry-breadcrumb";
import { Searchbar } from "@/components/searchbar";
import { Accordion } from "@/components/ui/accordion";
import { RegistryItem } from "@/lib/schema";
import registry from "@/registry";
import { useState } from "react";

export default function HooksPage() {
  const [query, setQuery] = useState("");
  const [openAccordion, setOpenAccordion] = useState<string[]>(["Hooks"]);
  const hookItems = registry.items.filter((item) => item.type === "registry:hook");
  const [selectedItem, setSelectedItem] = useState<RegistryItem>(hookItems[0]);

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
            title="Hooks"
            options={hookItems}
            selectedItem={selectedItem}
            onSelectedItem={setSelectedItem}
          />
        </Accordion>
      </div>
      <div className="h-full flex flex-1 flex-col gap-6">
        <RegistryBreadcrumb />
        <HooksContentView registryItem={selectedItem} />
      </div>
    </main>
  );
}
