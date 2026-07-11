# AI Rules

## Tech Stack
- Build the app with **Next.js** and **React**.
- Use **TypeScript** for all application code.
- Use **React Router-style page structure only when the app already uses it**; otherwise keep routing in the framework’s native routing setup.
- Keep all source code in the **`src/`** folder when adding new app code.
- Put reusable UI pieces in **`src/components/`**.
- Put page-level views in **`src/pages/`** when the app uses a pages directory.
- Use **Tailwind CSS** for all styling and layout work.
- Use **lucide-react** for icons.
- Prefer **shadcn/ui** components for standard UI controls and common patterns.

## Library Rules
- Use **shadcn/ui** for buttons, inputs, dialogs, dropdowns, tabs, cards, forms, and other common interface components.
- Use **Tailwind CSS** utility classes for spacing, sizing, colors, alignment, responsiveness, and visual polish.
- Use **lucide-react** only for icons; do not add another icon library.
- Use **React state/hooks** for local UI state and interaction logic.
- Use **Next.js** built-in features for routing, layout, and server/runtime concerns instead of adding extra routing libraries.
- Use **TypeScript types** for component props, data models, and helper functions.
- Use **motion** only for purposeful animations; keep animations minimal and supportable.
- Avoid introducing new libraries unless they are clearly necessary and fit the existing stack.

## Working Rules
- Keep changes small, focused, and easy to understand.
- Prefer existing project patterns over introducing new ones.
- Do not edit generated or prebuilt UI library files directly; create app components instead.
- When adding UI, make sure it is actually wired into the main page so users can see it.
