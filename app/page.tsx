"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import registryItems from "@/registry.json";
import { CardListItem } from "@/components/card-list-item";
import { componentsMap } from "@/lib/import-management";
import { TabsView } from "@/components/tabs-view";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number>(0);
  const [SelectedComponent, setSelectedComponent] =
    useState<React.ComponentType<{}>>();

  const filteredItems = registryItems.items
    .filter((item) => item.files.length === 1)
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  const fetchComponent = () => {
    if (filteredItems[selected]?.files[0]?.path) {
      const componentPath = filteredItems[selected].files[0].path;
      const Component = componentsMap[componentPath];
      if (Component) {
        setSelectedComponent(() => Component);
      } else {
        console.error("Component not found in componentMap:", componentPath);
        setSelectedComponent(undefined);
      }
    }
  };

  useEffect(() => {
    fetchComponent();
  }, [selected, filteredItems]);

  return (
    <div className="flex flex-col h-[98dvh] p-6 gap-6 bg-background overflow-hidden">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          3D Informatica Registry
        </h1>
        <p className="text-muted-foreground">
          A collection of reusable React components and code examples built with
          shadcn/ui, designed to help developers quickly implement common UI
          patterns and features.
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
            {filteredItems?.length > 0 ? (
              filteredItems.map((item, index) => (
                <CardListItem
                  key={index}
                  item={{
                    title: item.title,
                    description: item.description,
                    component: item.files[0].path,
                  }}
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
          {filteredItems[selected]?.files[0]?.path && (
            <TabsView
              key={"component-view"}
              title={filteredItems[selected]?.title ?? ""}
              path={filteredItems[selected]?.files[0]?.path ?? ""}
              selectedComponent={SelectedComponent}
            />
          )}
        </div>
      </main>
    </div>
  );
}
