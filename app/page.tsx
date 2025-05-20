"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import registry from "@/registry.json";
import { CardListItem, RegistryItem } from "@/components/card-list-item";
import { uiDynamicImports } from "@/lib/import-management";
import { TabsView } from "@/components/tabs-view";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number>(0);
  const [SelectedComponent, setSelectedComponent] =
    useState<React.ComponentType>();

  const registryItems: RegistryItem[] = registry.items
    .filter((item): item is RegistryItem => item.type === "registry:ui")
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  const fetchComponent = () => {
    if (registryItems[selected]?.files?.[0]?.path) {
      const componentPath = registryItems.at(selected)?.files?.[0]?.path ?? "";
      const Component = uiDynamicImports[componentPath];

      console.log('Component:', Component);
      console.log('componentPath:', componentPath);

      if (Component) {
        setSelectedComponent(() => Component);
      } else {
        console.error("Component not found");
        setSelectedComponent(undefined);
      }
    }
  };

  useEffect(() => {
    fetchComponent();
  }, [selected, registryItems]);

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
        <div key={"component-list"} className="flex flex-col gap-2 w-[16%]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a component..."
            className="w-full rounded-sm border-input bg-accent p-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <section className="flex flex-col gap-2 py-2">
            {registryItems?.length > 0 ? (
              registryItems.map((item, index) => (
                <CardListItem
                  key={index}
                  item={item}
                  selected={selected === index}
                  onSelect={() => setSelected(index)}
                />
              ))
            ) : (
              <div className="flex flex-col gap-1.5 items-center py-4">
                <p className="text-muted-foreground">No results found</p>
              </div>
            )}
          </section>
        </div>
        <div className="flex flex-col gap-2 w-[84%] h-full">
          {registryItems.at(selected)?.files?.[0]?.path && (
            <TabsView
              key={"component-view"}
              title={registryItems.at(selected)?.title ?? ""}
              path={registryItems.at(selected)?.files?.[0]?.path ?? ""}
              selectedComponent={SelectedComponent}
            />
          )}
        </div>
      </main>
    </div>
  );
}
