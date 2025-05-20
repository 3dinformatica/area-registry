import { RegistryItem } from "../../lib/schema";

export const BlockComponents: RegistryItem[] = [
  {
    name: "navbar",
    type: "registry:block",
    title: "Navbar",
    description: "Navbar component",
    files: [
      {
        type: "registry:block",
        path: "registry/block/navbar/navbar.tsx",
        target: "components/area/block/navbar.tsx",
      },
    ],
  },
  {
    name: "sidebar",
    type: "registry:block",
    title: "Sidebar",
    description: "Sidebar component",
    files: [
      {
        type: "registry:block",
        path: "registry/block/sidebar/sidebar.tsx",
        target: "components/area/block/sidebar.tsx",
      },
    ],
  },
];
