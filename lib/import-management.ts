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
  "registry/area/nav-bar/navbar.tsx": dynamic(
    () => import("@/registry/area/navbar/navbar").then((mod) => mod.Navbar)
  ),
  "registry/area/hello-world/hello-world.tsx": dynamic(
    () => import("@/registry/area/hello-world/hello-world").then((mod) => mod.HelloWorld)
  ),
  "registry/area/select/select.tsx": dynamic<any>(
    () => import("@/registry/area/select/select").then((mod) => mod.AreaSelect)
  ),
};