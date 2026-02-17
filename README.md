# KB Lesson Components

## must be in JS!!

A shared React + Vite project for building and testing standalone interactive lesson components (`.tsx` files). Each component is self-contained so it can be previewed here, then copied to another site when ready.

## Project Structure

```
kb-lesson-components/
  package.json
  vite.config.ts
  index.html
  src/
    main.tsx              # entry point
    App.tsx               # component picker / gallery UI
    components/
      HaberReactor.tsx    # Haber reaction limiting reactant demo
      (add more here)
```

## Getting Started

```bash
# Install dependencies (only needed once, or after adding new packages)
npm install

# Start the dev server
npm run dev
```

The dev server runs at **http://localhost:5173/**. You'll see a gallery page listing all registered components -- click one to preview it.

## Adding a New Component

1. Create a new `.tsx` file in `src/components/` (e.g. `BoyleGasLaw.tsx`). Make sure it exports a default React component:

   ```tsx
   import React from "react";

   function BoyleGasLaw() {
     return <div>Your component here</div>;
   }

   export default BoyleGasLaw;
   ```

2. Open `src/App.tsx` and import it at the top:

   ```tsx
   import BoyleGasLaw from "./components/BoyleGasLaw.tsx";
   ```

3. Add an entry to the `components` registry object in the same file:

   ```tsx
   "boyle-gas-law": {
     label: "Boyle's Gas Law",
     element: <BoyleGasLaw />,
   },
   ```

4. Save -- the dev server hot-reloads and the new component appears in the gallery automatically.

## Moving a Component to Another Site

When a component works the way you want, copy just the single `.tsx` file from `src/components/` to your target project. Each component is designed to be self-contained with inline styles and no external dependencies beyond React.

## Other Commands

```bash
# Production build
npm run build

# Preview the production build
npm run preview

# Lint
npm run lint
```
