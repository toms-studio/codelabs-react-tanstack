# React Vite TanStack Router Boilerplate

A modern, production-ready boilerplate for building React applications with TypeScript, Vite, TanStack Router, TanStack Query, React Hook Form, Zod, Shadcn UI, and more.

## Quick Start

Create a new project using npx:

```bash
npx codelabs-react-tanstack my-app
cd my-app
npm run dev
```

This will:
- Create a new directory with your project name
- Copy all boilerplate files
- Initialize a git repository
- Install all dependencies
- Set up the project ready for development

## Features

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with TypeScript
- 🎯 **TanStack Router** - Type-safe routing with file-based routes
- 🔄 **TanStack Query** - Powerful data synchronization for React
- 📝 **React Hook Form** - Performant forms with easy validation
- ✅ **Zod** - TypeScript-first schema validation
- 🎨 **Shadcn UI** - Beautiful, accessible component library
- 🌙 **Dark Mode** - Built-in dark mode with system preference support (powered by usehooks-ts)
- 💅 **Tailwind CSS** - Utility-first CSS framework
- 🧹 **Biome** - Fast formatter and linter
- 🪝 **Husky** - Git hooks made easy
- 📋 **Commitlint** - Lint commit messages
- 🎯 **lint-staged** - Run linters on staged files
- 📅 **date-fns** - Date utility library
- 🔔 **Sonner** - Beautiful toast notifications
- 🌐 **Axios** - HTTP client with interceptors

## Project Structure

```
src/
├── routes/              # TanStack Router route definitions
│   ├── __root.tsx       # Root route with layout
│   ├── index.tsx        # Homepage route
│   ├── login.tsx        # Login page
│   ├── signup.tsx       # Sign up page
│   └── forgot-password.tsx  # Forgot password page
├── components/          # React components
│   ├── ui/              # Shadcn UI components
│   ├── shared/          # Shared reusable components
│   └── layout/          # Layout components
├── context/             # React context providers
│   ├── root.tsx                    # Root provider combining all contexts
│   ├── dark-mode.provider.tsx      # Dark mode context provider
│   └── tanstack-query.provider.tsx # TanStack Query provider
├── hooks/               # Custom React hooks
│   ├── utility/                    # Utility hooks
│   │   └── use-dark-mode.ts       # Dark mode hook
│   ├── queries/                    # TanStack Query hooks
│   └── mutations/                  # TanStack Query mutations
├── features/            # Feature-based modules
├── constants/           # Application constants
├── lib/                 # Utilities and helpers
│   ├── utils.ts         # General utilities
│   ├── validations.ts   # Zod schemas
│   ├── date.ts          # Date utilities
│   ├── axios.ts         # Axios instance
│   └── notify.ts         # Toast notifications
├── hooks/               # Custom React hooks
│   ├── queries/         # TanStack Query hooks
│   └── mutations/       # TanStack Query mutations
└── styles/              # Global styles
    └── globals.css      # Tailwind + Shadcn styles
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation Options

#### Option 1: Using npx (Recommended)

Create a new project from the boilerplate:

```bash
npx codelabs-react-tanstack my-app
cd my-app
npm run dev
```

#### Option 2: Clone and Install Manually

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Biome
- `npm run format:check` - Check code formatting
- `npm run check` - Run all Biome checks
- `npm run check:fix` - Fix all Biome issues

## Tech Stack Details

### Routing

TanStack Router is configured with file-based routing. Routes are automatically discovered from the `src/routes/` directory.

### Forms

Forms are built using React Hook Form with Zod validation. Example validation schemas are available in `src/lib/validations.ts`.

### Data Fetching

TanStack Query is set up with example query and mutation hooks in `src/hooks/queries/` and `src/hooks/mutations/`.

### Styling

- Tailwind CSS for utility-first styling
- Shadcn UI for accessible components
- CSS variables for theming (light/dark mode support)

### Context Management

- Context providers organized in `src/context/`
- `RootProvider` combines all providers for clean app structure
- TanStack Query and Dark Mode contexts available throughout the app

### Code Quality

- Biome for formatting and linting
- Husky for git hooks
- Commitlint for commit message validation
- lint-staged for pre-commit checks

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Path Aliases

The project uses `@/` as an alias for `src/`. Configured in:
- `vite.config.ts`
- `tsconfig.app.json`

### Dark Mode

The project includes a built-in dark mode feature powered by [usehooks-ts](https://usehooks-ts.com/react-hook/use-dark-mode). The theme toggle is available in the header.

Usage in your components:
```tsx
import { useDarkMode } from '@/hooks/utility/use-dark-mode';

function MyComponent() {
  const { isDarkMode, toggle, enable, disable } = useDarkMode();
  // Use dark mode state in your component
}
```

The dark mode context is provided via `RootProvider` which wraps the entire application in the root route.

## Git Hooks

The project includes:
- **Pre-commit**: Runs lint-staged to format and lint staged files
- **Commit-msg**: Validates commit messages follow conventional commit format

## Commit Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions or changes
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes

## Example Pages

The boilerplate includes example pages:
- Homepage (`/`) - Welcome page with navigation
- Login (`/login`) - Login form with validation
- Sign Up (`/signup`) - Registration form with validation
- Forgot Password (`/forgot-password`) - Password reset form

## License

MIT
