# Contributing to Alumni Portal

Thank you for your interest in contributing to the Alumni Portal System! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR-USERNAME/Alumni-Portal.git
   cd Alumni-Portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Fill in your Supabase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Run tests
npm test

# Build to ensure no errors
npm run build
```

### 4. Commit Your Changes

We follow conventional commits:

```bash
git add .
git commit -m "feat: add job filtering by salary range"
# or
git commit -m "fix: resolve pagination issue on events page"
```

Commit types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Code Style Guide

### TypeScript

- Use TypeScript for all new files
- Define proper types (avoid `any`)
- Use interfaces for object shapes
- Export types when shared

```typescript
// Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// Avoid
const user: any = { ... };
```

### React Components

- Use functional components
- Use hooks for state and side effects
- Keep components focused and small
- Extract reusable logic into custom hooks

```typescript
// Good
export const MyComponent: React.FC<Props> = ({ title }) => {
  const [state, setState] = useState(initialValue);
  
  return <div>{title}</div>;
};
```

### Naming Conventions

- Components: PascalCase (`UserProfile.tsx`)
- Hooks: camelCase with 'use' prefix (`useAuth.ts`)
- Services: camelCase with '.service' suffix (`job.service.ts`)
- Utilities: camelCase (`formatDate.ts`)
- Types: PascalCase (`User`, `JobFilters`)

### File Organization

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── layout/          # Layout components
│   └── features/        # Feature-specific components
├── pages/               # Page components
├── services/            # API services
├── hooks/               # Custom hooks
├── contexts/            # React contexts
├── types/               # TypeScript types
└── utils/               # Utility functions
```

### Styling

- Use Tailwind CSS utility classes
- Keep styles inline when possible
- Extract repeated patterns to components
- Use semantic class names

```tsx
// Good
<button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
  Click me
</button>

// Avoid inline styles
<button style={{ padding: '8px 16px' }}>Click me</button>
```

## Component Guidelines

### Props

- Always define prop types
- Use optional chaining for optional props
- Provide default values when appropriate

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  // Component logic
};
```

### State Management

- Use local state when possible
- Use Context for shared state
- Keep state as close to usage as possible

### Error Handling

- Always handle errors in async operations
- Show user-friendly error messages
- Log errors for debugging

```typescript
try {
  await apiCall();
} catch (error) {
  console.error('Error:', error);
  showToast('Failed to load data', 'error');
}
```

## Testing

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Best Practices

- Test user behavior, not implementation
- Use meaningful test descriptions
- Test edge cases
- Mock external dependencies

## Pull Request Guidelines

### Before Submitting

- [ ] Code builds without errors
- [ ] All tests pass
- [ ] Linter passes
- [ ] Documentation updated
- [ ] No console errors/warnings
- [ ] Tested in multiple browsers

### PR Description

Include:
- What changes were made
- Why the changes were needed
- How to test the changes
- Screenshots (for UI changes)
- Related issues

Template:
```markdown
## Description
Brief description of changes

## Motivation
Why this change is needed

## Changes
- Change 1
- Change 2

## Testing
How to test this PR

## Screenshots (if applicable)
![screenshot](url)

## Checklist
- [ ] Code builds
- [ ] Tests pass
- [ ] Docs updated
```

## Code Review Process

1. Submit PR
2. CI/CD checks run automatically
3. Maintainer reviews code
4. Address feedback
5. Approved and merged

## Common Issues

### Build Errors

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### Type Errors

- Check TypeScript configuration
- Ensure all imports are typed
- Update type definitions

### Styling Issues

- Check Tailwind config
- Ensure PostCSS is configured
- Review responsive breakpoints

## Questions?

- Open an issue for bugs
- Start a discussion for questions
- Join our community chat

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

---

Thank you for contributing! 🎉
