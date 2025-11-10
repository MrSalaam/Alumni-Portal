# Contributing to Alumni Portal

Thank you for your interest in contributing to the Alumni Portal! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (browser, OS, etc.)

### Suggesting Enhancements

1. Check existing issues and discussions
2. Create a new issue with:
   - Clear description of the enhancement
   - Use cases and benefits
   - Potential implementation approach
   - Any relevant examples or mockups

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards
4. Test your changes thoroughly
5. Commit with clear, descriptive messages
6. Push to your fork
7. Create a Pull Request

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Alumni-Portal.git
cd Alumni-Portal

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types/interfaces
- Avoid `any` type when possible
- Use type imports (`import type { Type }`)

### React

- Use functional components with hooks
- Follow React best practices
- Use meaningful component names
- Keep components focused and small

### Styling

- Use Tailwind CSS utility classes
- Follow existing design patterns
- Ensure responsive design
- Test on multiple screen sizes

### File Organization

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Library configurations
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Testing

### Before Submitting

- [ ] Run linter: `npm run lint`
- [ ] Build successfully: `npm run build`
- [ ] Test in development: `npm run dev`
- [ ] Test responsive design
- [ ] Check browser console for errors

### Manual Testing

Test your changes on:
- Chrome/Edge
- Firefox
- Safari (if possible)
- Mobile browsers

## Commit Messages

Follow conventional commits:

```
feat: add user notification system
fix: resolve login redirect issue
docs: update README with setup instructions
style: format code according to ESLint
refactor: reorganize component structure
test: add tests for authentication
chore: update dependencies
```

## Pull Request Guidelines

### Title

- Use clear, descriptive titles
- Reference issue numbers: "Fixes #123"
- Use prefixes: `feat:`, `fix:`, `docs:`, etc.

### Description

Include:
- Summary of changes
- Related issue numbers
- Screenshots (for UI changes)
- Testing performed
- Breaking changes (if any)

### Review Process

1. Automated checks must pass
2. Code review by maintainers
3. Address feedback
4. Approval and merge

## Feature Development

### Planning

1. Discuss in an issue first
2. Get consensus on approach
3. Break into smaller tasks
4. Document in PR description

### Implementation

1. Write clean, readable code
2. Add comments for complex logic
3. Follow existing patterns
4. Update documentation
5. Add types/interfaces

### Documentation

Update relevant docs:
- README.md for user-facing changes
- Code comments for complex logic
- Type definitions
- DEPLOYMENT.md if needed

## Database Changes

### Schema Changes

1. Update `supabase/schema.sql`
2. Update TypeScript types in `src/types/supabase.ts`
3. Test migrations locally
4. Document changes in PR

### RLS Policies

- Always include RLS policies
- Test security implications
- Document policy logic

## Common Issues

### Build Errors

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Type Errors

- Check TypeScript version
- Update type definitions
- Ensure proper type imports

### Styling Issues

- Clear Tailwind cache
- Check class names
- Verify responsive breakpoints

## Getting Help

- Comment on relevant issues
- Ask in discussions
- Tag maintainers if needed
- Be patient and respectful

## Recognition

Contributors will be:
- Listed in release notes
- Credited in commits
- Recognized in documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to ask questions by:
- Opening an issue
- Starting a discussion
- Commenting on existing issues

Thank you for contributing! 🎉
