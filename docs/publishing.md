# Publishing Your Plugin

To make your plugin discoverable in Aloha Desktop, you need to:
1. Publish a release on GitHub
2. Add your plugin to the aloha-releases registry

## Step 1: Publish GitHub Release

### Automatic Publishing (Recommended)

The vite-aloha template includes a GitHub Actions workflow that automatically creates releases when you push a new version tag.

#### Enable Workflow Permissions

First, configure your repository to allow the workflow to create releases:

1. Go to your repository **Settings**
2. Navigate to **Actions** → **General**
3. Scroll to **Workflow permissions**
4. Select: **Read and write permissions**
5. Click **Save**

#### Create a Release

```bash
# Update version in package.json (e.g., to 1.0.0)
npm version 1.0.0

# This creates a commit and tag automatically
# Push both the commit and tag
git push origin main
git push origin v1.0.0
```

The GitHub Actions workflow will automatically:
- ✅ Build your plugin
- ✅ Create a `plugin.tgz` archive containing the `dist` folder
- ✅ Create a GitHub release with both `manifest.json` and `plugin.tgz`
- ✅ Attach the required assets to the release

::: tip
The workflow is triggered by tags matching the pattern `v*.*.*` (e.g., v1.0.0, v2.1.3)
:::

### Manual Publishing

If you prefer to publish manually or use a different CI/CD provider to release a new version:

#### 1. Build Your Plugin

```bash
npm run build
```

#### 2. Create Plugin Archive

**For plugins bundled with vite-aloha:**

```bash
# Create tarball from dist folder
tar czf plugin.tgz dist
```

**For non-bundled plugins:**

```bash
# Create tarball with src and public folders
tar czf plugin.tgz src public
```

#### 3. Create GitHub Release

1. Go to your repository on GitHub
2. Click **Releases** → **Create a new release**
3. Create a new tag (e.g., `v1.0.0`)
4. Fill in release title and description
5. Upload two files:
   - `manifest.json`
   - `plugin.tgz`
6. Click **Publish release**

## Step 2: Add to aloha-releases Registry

Once you have a published GitHub release with the required assets, register your plugin in the marketplace.

::: tip
You only need to submit the plugin to the registry **once**. After your plugin is published, users can download and update to new releases directly from the app.
:::

### Submit to Registry

1. Visit the [aloha-releases repository](https://github.com/antarasi/aloha-releases)
2. Click on `plugins.json`
3. Click the **Edit** button (pencil icon)
4. Add your plugin entry to the JSON array:

```json
[
  ...existing plugins...,
  {
    "repo": "yourusername/aloha-your-plugin",
    "name": "Your Plugin Display Name",
    "author": "Your Name",
    "description": "Short description of what your plugin does",
    "icon": "https://raw.githubusercontent.com/yourusername/aloha-your-plugin/refs/heads/main/public/icon.svg"
  }
]
```

5. Commit changes and **create a Pull Request**

### Registry Entry Fields

| Field         | Type    | Required | Description                                                                            |
|---------------|---------|----------|----------------------------------------------------------------------------------------|
| `repo`        | string  | ✅       | GitHub repository in `username/repo-name` format                                       |
| `name`        | string  | ✅       | Display name shown in the marketplace                                                  |
| `author`      | string  | ✅       | Your name or organization                                                              |
| `description` | string  | ✅       | Brief description of functionality (1-2 sentences)                                     |
| `icon`        | string  |         | Direct URL to your icon file                                                            |

## After Publishing

### Wait for Registry Approval

After submitting your PR to aloha-releases:

1. Your submission will be reviewed
2. Once approved and merged, your plugin appears in the marketplace
3. Users can now discover and install your plugin


## Next Steps

- [Release Requirements](/plugin-requirements.html#release-requirements) - Review basic plugin release requirements
- [Adding Dependencies](/adding-dependencies) - Bundle NPM packages
- [Examples](/examples) - See published plugin examples
- [SDK Features](/cli) - Explore SDK features

