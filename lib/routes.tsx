export interface AppRouteItem {
  id: number;
  href: string;
  title: string;
  description: string;
}

export const appRoutes: AppRouteItem[] = [

  {
    id: 1,
    href: "/components",
    title: "Components", 
    description: "A collection of UI components and blocks for building interfaces",
  },
  { 
    id: 2,
    href: "/hooks",
    title: "Hooks",
    description: "A collection of reusable hooks for managing state and effects",
  },
];
