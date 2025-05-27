import { Registry } from "../lib/schema";
import { UiItems } from "./ui/ui-items";
import { BlockItems } from "./block/block-items";
import { HookItems } from "./hooks/hook-items";

const registry: Registry = {
  name: "3D informatica",
  homepage: "https://www.3di.it/",
  items: [...UiItems, ...BlockItems, ...HookItems]
};

export default registry; 