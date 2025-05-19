# Area Registry

A simple way to share and reuse React components across your projects.

## Table of Contents

- [What's Inside](#whats-inside)
- [How to Add Your Own Components](#how-to-add-your-own-components)
  - [Create Your Component](#1-create-your-component)
  - [Register Your Component](#2-register-your-component)
  - [Build Your Registry](#3-build-your-registry)
- [Best Practices](#best-practices)
- [Usage](#usage)
  - [Local Usage](#local-usage)
  - [Remote Usage](#remote-usage)
- [Need Help?](#need-help)

## What's Inside

```
area-registry/
├─ registry/                    # Your components live here
│   └── area/                   # Themes
|        ├─ component-A
|        |   └─ component-a.tsx
|        └─ component-B
|            └─ component-b.tsx
├─ public/r/                     # Ready-to-use components
└─ registry.json                 # Component configuration
```

## How to Add Your Own Components

1. **Create Your Component**

   - Put your component in the `registry/area/` folder
   - Follow the existing folder structure

2. **Register Your Component**
   In lib/import-management.ts you need to add any new dyncamic import paths

   ```typescript
     "registry/your-path/your-component.tsx": dynamic(() =>
       import("@/registry/your-path/your-component").then(
         (mod) => mod.YourComponent
       )
     ),
   ```

3. **Build Your Registry**
   ```bash
   pnpm registry:build
   ```

## Best Practices

- Keep components organized by themes (ex. area folder)
- Use clear, consistent names
- Keep components small and focused
- Always add new components to `import-management.ts`

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

**Script**
To make it easier to download components form the registry I suggest you to add this script to your `package.json`

```json
  "registry-add:": "sh -c 'pnpm dlx shadcn@latest add https://3dinformatica.github.io/area-registry/r/$1' -"
```

By adding this script you will only need to execute this command followed by the component identifier.

```bash
  pnpm registry-add:hello-world.json
```

## Need Help?

- [shadcn Documentation](https://ui.shadcn.com/docs/registry)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind Documentation](https://tailwindcss.com/docs)
