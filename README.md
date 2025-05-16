
# Area Registry Documentation

## Overview

The Area Registry is a component registry system built on top of the shadcn template, designed to distribute and manage custom React components, hooks, pages, and other files across React projects. It uses Next.js and supports Tailwind v4.

## Project Structure

```
area-registry/
├── registry/           # Contains all registry components
│   ├── area/          # Area-specific components
│   └── new-york/      # New York theme components
│       ├── blocks/    # Reusable block components
│       └── area-*     # Area-specific components
├── lib/
│   └── import-management.ts  # Component import management
├── public/
│   └── r/            # Static registry files
└── registry.json     # Registry configuration
```

## Component Management

### Adding New Components

To add a new component to the registry, follow these steps:

1. Create your component in the appropriate directory under `registry/`
2. Add the import path component to `lib/import-management.ts`

Example of adding a new component:

```typescript
// In lib/import-management.ts
export const componentsMap: ComponentMap = {
  // ... existing components ...
  "registry/your-path/your-component.tsx": dynamic(() =>
    import("@/registry/your-path/your-component").then(
      (mod) => mod.YourComponent
    )
  ),
};
```

### Component Import Management

The `import-management.ts` file is crucial for the registry system. It:

- Manages dynamic imports for all registry components
- Enables code-splitting and lazy loading
- Provides type safety through TypeScript
- Centralizes component path mapping

Key features:

- Uses Next.js dynamic imports for optimal performance
- Supports code-splitting out of the box
- Maintains a type-safe component map
- Enables easy component discovery and usage

## Registry Configuration

The registry uses a `registry.json` file to define components and their files. This file is used by the `shadcn build` command to build the registry.

## Integration with shadcn CLI

The registry is fully compatible with the shadcn CLI, allowing you to:

- Build and serve registry items
- Distribute components to other projects
- Use the registry in any React project

## v0 Integration

The project includes integration with v0 using the "Open in v0" API, allowing for enhanced component management and distribution.

## Best Practices

1. **Component Organization**

   - Keep components organized by theme/area
   - Use consistent naming conventions
   - Maintain clear component hierarchy

2. **Import Management**

   - Always add new components to `import-management.ts`
   - Use proper path mapping
   - Follow the existing pattern for dynamic imports

3. **Performance**
   - Utilize code-splitting through dynamic imports
   - Keep components modular and focused
   - Follow React best practices for component design

## Getting Started

1. Clone the repository
2. Install dependencies
3. Add your components to the registry
4. Update `import-management.ts`
5. Build the registry using `shadcn build`

## Using Components from this Registry

To use components from this registry in your own project, you can utilize the shadcn CLI:

localhost 
```bash
pnpm dlx shadcn@latest add http://localhost:3000/r/[$component].json
```
deployed:
```bash
pnpm dlx shadcn@latest add http://area-library/r/[$component].json
```

## Additional Resources

- [shadcn Documentation](https://ui.shadcn.com/docs/registry)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind v4 Documentation](https://tailwindcss.com/docs)
