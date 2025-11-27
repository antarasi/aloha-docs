# Plugin Requirements

When publishing your plugin, ensure it meets these requirements:

## General Requirements

1. **Repository naming** - Repository name must be prefixed with `aloha-`
1. **Open source** - Plugin must be open source. Don't obfuscate code to hide its purpose.
1. **No code eval** - Don't execute the code loaded over the internet. All executable code needs to be contained in your plugin.
1. **Privacy** - No telemetry - respect users' privacy
1. **Manifest** - Must include a valid `manifest.json` file
1. **Release** - Must be published as a GitHub release
1. **No auto-update** - Don't include a mechanism that updates the plugin by itself. Let users manage updates in the app.
1. **No dynamic adds** - Don't insert dynamic ads that are loaded over the internet

Violations can be reported [here](https://github.com/antarasi/aloha-releases/issues/new?template=requirements_violation.md).

## Icon Requirements

### Maximum Size
**10kB maximum file size**

### Supported Formats
- `image/svg+xml` (recommended)
- `image/png`
- `image/jpeg` / `image/jpg`
- `image/gif`
- `image/webp`
- `image/ico` / `image/x-icon`
- `image/bmp`
- `image/tiff`

### Best Practices

**Use monochrome icons** with #171717 color and transparent background. Colors will be inverted automatically for dark mode.

**Recommended source:** Use SVG icons from [Lucide](https://lucide.dev/icons/) for consistent, professional-looking icons that match the Aloha Desktop design language.



## Manifest Requirements

Your `manifest.json` must include at least the following minimal manifest below. You can copy that as a template and customize.

```json
{
  "manifestVersion": 1,
  "name": "Your Plugin Name",
  "version": "1.0.0",
  "description": "Short description of your plugin",
  "author": "Your Name",
  "main": "src/index.esm.js",
  "tools": [
    {
      "name": "toolName",
      "displayName": "Tool Display Name",
      "description": "What this tool does, when and how to use it"
    }
  ]
}
```

### Manifest Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `manifestVersion` | number | ✅ | Currently always `1` |
| `name` | string | ✅ | Display name of your plugin |
| `version` | string | ✅ | Semantic version (e.g., "1.0.0") |
| `description` | string | ✅ | Displayed under your plugin name |
| `author` | string | ✅ | Your name |
| `icon` | string |   | Path to icon file relative to plugin root |
| `main` | string | ✅ | Path to main entry point file |
| `tools` | array | ✅ | Array of tool definitions |

### Tool Definition

Each tool in the `tools` array must include:

| Field           | Type    | Required | Description |
|-----------------|---------|----------|-------------|
| `name`          | string  | ✅       | Unique tool identifier (used in code) |
| `displayName`   | string  | ✅       | Human-readable tool name displayed in the conversation history |
| `description`   | string  | ✅       | What the tool does (used by AI to decide when to use it) |
| `parameters`    | object  |         | Schema defining tool parameters |

### Tool Parameter Definition

The `parameters` object follows JSON Schema specification. Common fields:

| Field        | Type      | Required | Description |
|--------------|-----------|----------|-------------|
| `type`       | string    | ✅       | Currently always `"object"` |
| `required`   | string[]  |          | Array of required property names |
| `properties` | object    | ✅       | Defines object properties |
| `properties.<name>.description`| string    | ✅       | Parameter description (helps AI understand usage) |
| `properties.<name>.enum`       | array     |          | List of allowed values |
| `properties.<name>.items`      | object    |          | Schema for array items (for type `"array"`) |

**Example with multiple parameter types:**

```json
{
  "name": "search",
  "displayName": "Search",
  "description": "Search for items",
  "parameters": {
    "type": "object",
    "required": ["query"],
    "properties": {
      "query": {
        "type": "string",
        "description": "Search query",
        "minLength": 1
      },
      "limit": {
        "type": "number",
        "description": "Maximum results",
        "minimum": 1,
        "maximum": 100,
        "default": 10
      },
      "category": {
        "type": "string",
        "description": "Filter by category",
        "enum": ["all", "docs", "code", "images"]
      },
      "includeArchived": {
        "type": "boolean",
        "description": "Include archived items",
        "default": false
      }
    }
  }
}
```

[More JSON Schema Examples](https://json-schema.org/learn/miscellaneous-examples)

## Code Requirements

### Export Structure

Your main file must default export a class:

```typescript
import { Plugin } from 'aloha-sdk'
import type { PluginContext } from 'aloha-sdk'

export default class MyPlugin extends Plugin {
  constructor(context: PluginContext) {
    super(context)
  }

  async toolCall(toolName: string, args: Record<string, any>): Promise<string> {
    // Your implementation
    return 'result'
  }
}
```

### Module Format

Plugins must be in **ESM (ECMAScript Module)** format:
- Use `export` and `import` statements
- File extension should be `.esm.js` or `.esm.mjs`
- Avoid CommonJS (`require`, `module.exports`)

## Release Requirements

Your GitHub release must include exactly two assets:

### 1. manifest.json
- Content type: `application/json`
- Contains your plugin manifest

### 2. plugin.tgz
- Content type: `application/octet-stream`
- Tarball archive containing all runtime files
- Must include everything your plugin needs to run

**Example plugin.tgz structure:**

```
plugin.tgz
├── dist/
│   ├── index.esm.js    # Your bundled plugin code
│   └── icon.svg        # Plugin icon
```

**Or for non-bundled plugins:**

```
plugin.tgz
├── src/
│   └── index.esm.js    # Your plugin code
└── public/
    └── icon.svg        # Plugin icon
```

## Next Steps

- [Adding NPM Dependencies](/adding-dependencies) - Learn how to bundle dependencies
- [Publishing Your Plugin](/publishing) - Publish your plugin to the marketplace
- [See Examples](/examples) - Study real-world plugin implementations

