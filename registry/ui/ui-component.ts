
import { RegistryItem } from "../../lib/schema";

export const UiComponents: RegistryItem[] = [
  {
    name: "tooltip-button",
    type: "registry:ui",
    title: "Tooltip Button",
    dependencies: ["button", "tooltip"],
    description: "Tooltip Button component",
    files: [
      {
        type: "registry:ui",
        path: "registry/ui/tooltip-button/tooltip-button.tsx",
        target: "components/area/ui/tooltip-button.tsx",
      },
    ],
  },
  {
    name: "hello-world",
    type: "registry:ui",
    title: "Hello World",
    description: "Hello World component",
    files: [
      {
        type: "registry:ui",
        path: "registry/ui/hello-world/hello-world.tsx",
        target: "components/area/ui/hello-world.tsx",
      },
    ],
  },
  {
    name: "select",
    type: "registry:ui",
    title: "Select",
    description: "Select component",
    files: [
      {
        type: "registry:ui",
        path: "registry/ui/select/select.tsx",
        target: "components/area/ui/select.tsx",
      },
    ],
  },
];
