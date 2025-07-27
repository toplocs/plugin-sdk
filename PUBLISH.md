# Publishing Guide for TopLocs Plugin SDK

## Prerequisites

1. Ensure you have npm access to publish under the `@toplocs` scope
2. Login to npm: `npm login`
3. Verify access: `npm whoami`

## Publishing Steps

1. **Ensure clean working directory**
   ```bash
   git status
   ```

2. **Update version in package.json**
   ```bash
   npm version patch  # or minor/major
   ```

3. **Build the package**
   ```bash
   npm run build
   ```

4. **Test the package locally**
   ```bash
   npm pack
   # This creates toplocs-plugin-sdk-1.0.0.tgz
   # Test in another project: npm install path/to/toplocs-plugin-sdk-1.0.0.tgz
   ```

5. **Publish to npm**
   ```bash
   npm publish
   ```

6. **Push tags to GitHub**
   ```bash
   git push origin main --tags
   ```

7. **Create GitHub Release**
   - Go to https://github.com/toplocs/plugin-sdk/releases
   - Click "Create a new release"
   - Select the version tag
   - Add release notes from CHANGELOG.md

## First-time Setup

If this is the first publish:

```bash
# Ensure you're logged in
npm login

# Publish with public access
npm publish --access public
```

## Version Guidelines

- **Patch** (1.0.x): Bug fixes, documentation updates
- **Minor** (1.x.0): New features, backwards compatible
- **Major** (x.0.0): Breaking changes

## Post-publish Checklist

- [ ] Package visible on https://www.npmjs.com/package/@toplocs/plugin-sdk
- [ ] Installation works: `npm install @toplocs/plugin-sdk`
- [ ] Update documentation if needed
- [ ] Announce in project channels