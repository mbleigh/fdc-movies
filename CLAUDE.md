# Next25 Movies - Development Guidelines

## Build Commands
- Development: `pnpm dev` - Starts development server
- Build: `pnpm build` - Creates production build
- Start: `pnpm start` - Runs production build
- Lint: `pnpm lint` - Runs linting checks

## Technology Stack
- Next.js 15 (App Router) with React 19, TypeScript 5
- Tailwind CSS v4.0 with ShadCN UI components
- AI: Firebase Genkit, Vertex AI
- Data: Firebase, Firebase Data Connect

## Code Style Guidelines
- File naming: kebab-case (`my-component.tsx`)
- Always use `@/` imports with no extensions
- Props: Define as separate exported interfaces
- Components: `export default function ComponentName() {}`
- Create UI components with `pnpm dlx shadcn add <component-name>`
- Follow ShadCN component structure
- Use aliases defined in tsconfig.json for imports

## Commit Guidelines
- Use conventional commit messages (feat, fix, chore, docs)
- Keep commits atomic and focused
- Run linting before commits

Always check project structure before making significant changes.