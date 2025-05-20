# Area Registry

A simple way to share and reuse React components across your projects.

## Table of Contents

- [What's Inside](#whats-inside)
- [How to Add Your Own Components](#how-to-add-your-own-components)
  - [Create Your Component](#1-create-your-component)
  - [Create Dynamic Import Path](#2-create-dynamic-import-path)
  - [Generate Registry JSON File](#3-generate-registry-json-file)
  - [Build Your Registry](#4-build-your-registry)
- [Usage](#usage)
  - [Local Usage](#local-usage)
  - [Remote Usage](#remote-usage)
- [Need Help?](#need-help)

## What's Inside

```
area-registry/
├─ public
|   └─ r                        # Ready-to-use components
├─ registry/
│   ├─ ui/                      # UI componenets live here
|   |   └─ ui-component.ts      # UI components definitions
|   ├─ block/                   # Blocks components live here
|   |   └─ block-component.ts   # Block components definitions
|   └─ index.ts                 # Main registry configuration
├─ scripts
|   ├─ build-registry.js
|   ├─ generate-registry.ts     # Script to generate the JSON file
|   └─ tsconfig.json            # TypeScript configuration for the generation script
|
└─ registry.json                # Component configuration
```

## How to Add Your Own Components

1. **Create Your Component**

   - Put your component into the according folder `ui`, `block` located inside the `@/registry/` folder
   - Follow the existing folder structure

2. **Create Dynamic Import Path**
   In lib/import-management.ts you need to add any new dyncamic import paths

   ```typescript
     "registry/your-path/your-component.tsx": dynamic(() =>
       import("@/registry/your-path/your-component").then(
         (mod) => mod.YourComponent
       )
     ),
   ```

3. **Generate Registry JSON File**
   The registry system uses TypeScript files as the source of truth for your components. This means that any changes to your components must be reflected in the corresponding TypeScript files before generating the JSON.

   ```bash
   pnpm registry:generate
   ```

4. **Build Your Registry**

   ```bash
   pnpm registry:build
   ```

   This command performs a complete build of your registry:

   - Remove the public registry directory and the registry.json file
   - Generates the latest registry.json from your TypeScript definitions
   - Builds all components using shadcn
   - Copies your theme configuration to the public directory

   This step is necessary to make your components available for both local development and remote usage.

### Component Management

1. **UI Components**

   - Located in `registry/ui/ui-component.ts`
   - Contains all UI-level components (buttons, inputs, etc.)
   - Each component must be defined following the `RegistryItem` type

2. **Block Components**
   - Located in `registry/block/block-component.ts`
   - Contains larger, composite components (navbars, sidebars, etc.)
   - Each component must be defined following the `RegistryItem` type

### Making Changes

Whenever you need to:

- Add a new component
- Modify an existing component
- Remove a component
- Change component properties

You must:

1. Update the corresponding TypeScript file:

   - For UI components: `registry/ui/ui-component.ts`
   - For block components: `registry/block/block-component.ts`

2. Generate the updated JSON:

   ```bash
   pnpm registry:generate
   ```

3. Build the registry to apply changes:
   ```bash
   pnpm registry:build
   ```

This process ensures that your `registry.json` file always stays in sync with your TypeScript component definitions, providing type safety and better maintainability.

## Usage

### Local Usage

To use components directly from your local registry make sure that your registry project is up and running and execute this command:

    ```bash
      pnpm dlx shadcn@latest add https://localhost:3000/<component.json>
    ```

### Remote Usage

To use a register's component inside another project you need to execute the follow command. This will download the source code of the specified component.

```bash
   pnpm dlx shadcn@latest add https://3dinformatica.github.io/area-registry/r/<component.json>
```

- Nice to have

To make it easier to download components form the registry I suggest you to add this script to your `package.json`. By doing so you only need to execute this command followed by the component identifier

```json
"registry-add:": "sh -c 'pnpm dlx shadcn@latest add https://3dinformatica.github.io/area-registry/r/$1' -"
```

```bash
pnpm registry-add:hello-world.json
```

## Need Help?

- [shadcn Documentation](https://ui.shadcn.com/docs/registry)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind Documentation](https://tailwindcss.com/docs)
