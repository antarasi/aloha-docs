# CLI

The aloha-sdk package includes a command-line tool for plugin development tasks.

## Installation

Install aloha-sdk as a dev dependency in your plugin project:

```bash
npm install --save-dev aloha-sdk
```

## Version Command

The `version` command automatically synchronizes the version number from your `package.json` to your `manifest.json` file. This ensures your plugin version stays consistent across builds.

### Usage

```bash
aloha version <source> <target>
```

### Arguments

- **source**: Path to the source file (typically `package.json`)
- **target**: Path to the target file (typically `manifest.json`)

### Example

```bash
aloha version package.json manifest.json
```

This command:
1. Reads the `version` field from `package.json`
2. Updates the `version` field in `manifest.json`
3. Preserves all other fields in `manifest.json`

## Automated Version Management

The recommended setup is to run the version command automatically before each build.

### Add to package.json Scripts

```json
{
  "scripts": {
    "prebuild": "aloha version package.json manifest.json",
    "build": "vite build"
  }
}
```

Now whenever you run `npm run build`, the version will be synced automatically.

::: tip
The `prebuild` script that automatically updates manifest version is already added to the official [vite-aloha](https://github.com/antarasi/vite-aloha/) template.
:::



## Next Steps

- [Logging](/logging) - Learn about plugin logging
- [Rendering Web Content](/rendering-web-content) - Fetch and render web pages
- [Publishing](/publishing) - Publish your plugin
- [Plugin Requirements](/plugin-requirements) - Review all requirements

