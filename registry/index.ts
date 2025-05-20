import { Registry, RegistryItem } from "../lib/schema";
import { UiComponents } from "./ui/ui-component";
import { BlockComponents } from "./block/block-component";



const registry: Registry = {
  name: "3D informatica",
  homepage: "https://www.3di.it/",
  items: [...UiComponents, ...BlockComponents]
};

export default registry; 