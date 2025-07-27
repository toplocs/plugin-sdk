# Contributing to TopLocs Plugin SDK

Thank you for your interest in contributing to the TopLocs Plugin SDK! We welcome contributions from the community and are grateful for any help you can provide.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please treat all contributors with respect and create a welcoming environment for everyone.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a branch** for your changes
4. **Make your changes** and test them
5. **Submit a pull request**

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ 
- pnpm (preferred) or npm
- Git

### Setup Steps

```bash
# Clone your fork
git clone git@github.com:YOUR_USERNAME/plugin-sdk.git
cd plugin-sdk

# Add upstream remote
git remote add upstream git@github.com:toplocs/plugin-sdk.git

# Install dependencies
pnpm install

# Build the SDK
pnpm build

# Run development mode
pnpm dev
```

## 🔄 Making Changes

### Branch Naming

Use descriptive branch names:
- `feat/add-new-component`
- `fix/resolve-typescript-error`
- `docs/update-readme`
- `chore/upgrade-dependencies`

### Development Workflow

1. **Pull latest changes**
   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow the existing code style
   - Add tests if applicable

4. **Test your changes**
   ```bash
   pnpm build
   pnpm test
   ```

## 📤 Submitting Changes

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add new plugin component loader
fix: resolve TypeScript import errors
docs: update API documentation
chore: upgrade Vue to latest version
```

### Pull Request Process

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**
   ```bash
   git push origin feat/your-feature-name
   ```

3. **Create a Pull Request**
   - Use a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

### PR Description Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Documentation updated

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Fixes #123
```

## 📏 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Provide proper type definitions
- Avoid `any` types
- Export types from `types.ts`

### Vue Components

- Use Vue 3 Composition API
- Follow single-file component structure
- Use `<script setup>` syntax
- Properly type props and emits

### Code Style

```typescript
// Good
export interface PluginConfig {
  id: string;
  name: string;
  slots: PluginSlot[];
}

// Bad
export interface pluginConfig {
  id: any
  name: any
  slots: Array<any>
}
```

### File Structure

```
src/
├── components/      # Vue components
├── types.ts        # TypeScript definitions
├── utils/          # Utility functions
└── index.ts        # Main exports
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run type checking
pnpm type-check
```

### Writing Tests

- Test files should be named `*.spec.ts`
- Cover edge cases
- Test both success and error scenarios
- Mock external dependencies

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Document complex logic
- Include usage examples

```typescript
/**
 * Creates a plugin development environment
 * @param config - Plugin development configuration
 * @returns Configured Vue application instance
 * @example
 * const app = createPluginDevelopmentEnvironment({
 *   pluginConfig: myConfig,
 *   components: { MyComponent }
 * });
 */
export function createPluginDevelopmentEnvironment(
  config: PluginDevConfig
): App<Element> {
  // Implementation
}
```

### README Updates

Update the README when:
- Adding new features
- Changing APIs
- Adding configuration options
- Fixing common issues

## 🎯 Areas for Contribution

We especially welcome contributions in these areas:

- **TypeScript improvements**: Better type definitions
- **Documentation**: Examples, guides, API docs
- **Testing**: Unit tests, integration tests
- **Performance**: Bundle size optimization
- **Features**: New development tools
- **Bug fixes**: Issue resolution

## 💬 Getting Help

- Open an issue for bugs
- Start a discussion for features
- Join our community chat
- Tag maintainers for urgent issues

## 🙏 Recognition

Contributors will be:
- Listed in our Contributors section
- Mentioned in release notes
- Given credit in commit messages

Thank you for contributing to TopLocs Plugin SDK!