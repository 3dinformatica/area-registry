import { RegistryItem } from "../../lib/schema";

export const HookItems: RegistryItem[] = [
  {
    name: "debounce",
    type: "registry:hook",
    title: "Debounce",
    description:
      "A React hook that delays updating a value until a specified delay time has passed since the last change. This is useful for preventing excessive updates when a value changes rapidly, such as handling search input or window resize events. The hook returns the debounced value which only updates after the user stops changing the input for the delay period.",
    dependencies: ["react"],
    files: [
      {
        type: "registry:hook",
        path: "registry/hooks/debounce/debounce.ts",
        target: "components/area/hooks/debounce.ts",
      },
    ],
  },
];
