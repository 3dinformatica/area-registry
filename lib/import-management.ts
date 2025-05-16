/**
 * @fileoverview Component Import Management
 * 
 * This file manages dynamic imports for the component registry system.
 * It provides a centralized mapping of component paths to their dynamically
 * imported React components using Next.js dynamic imports.
 *
 * The componentMap object contains pre-defined mappings for known components,
 * allowing lazy-loading of components when they are needed. This helps with
 * code-splitting and performance optimization.
 *
 * @typedef {Object.<string, React.ComponentType>} ComponentMap
 */

import dynamic from "next/dynamic";

type ComponentMap = {
    [key: string]: React.ComponentType;
  };
  
  // Pre-define dynamic imports for known components
  export const componentsMap: ComponentMap = {
    "registry/area/test-1.tsx": dynamic(() => import("@/registry/area/test-1").then(mod => mod.Test1)),
    "registry/new-york/area-hello-world/area-hello-world.tsx": dynamic(() => import("@/registry/new-york/area-hello-world/area-hello-world").then(mod => mod.AreaHelloWorld)),
    "registry/new-york/blocks/hello-world/hello-world.tsx": dynamic(() => import("@/registry/new-york/blocks/hello-world/hello-world").then(mod => mod.HelloWorld)),
    "registry/new-york/blocks/example-form/example-form.tsx": dynamic(() => import("@/registry/new-york/blocks/example-form/example-form").then(mod => mod.ExampleForm)),
    "registry/new-york/blocks/example-with-css/example-card.tsx": dynamic(() => import("@/registry/new-york/blocks/example-with-css/example-card").then(mod => mod.ExampleCard)),
  };