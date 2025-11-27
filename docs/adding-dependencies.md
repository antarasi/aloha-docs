# Adding NPM Dependencies

The recommended way to build plugins with NPM dependencies is using the official **vite-aloha** template.

[Get vite-aloha on GitHub](https://github.com/antarasi/vite-aloha/).

## Why Use vite-aloha?

The vite-aloha template provides a complete development environment with:

- 🔷 **TypeScript support** with strict type checking
- ⚡ **Vite build system** optimized for Node.js libraries
- 🧩 **Aloha SDK integration** with proper plugin structure
- 🧪 **Testing setup** with Node.js test runner
- 📦 **ESM module format** for modern JavaScript compatibility
- 🤖 **Automatic dependency bundling** - no manual configuration needed


## Quick Start

### Create New Plugin

Apply the template to create a new plugin:

```bash
npx degit antarasi/vite-aloha#main aloha-awesome-plugin
cd aloha-awesome-plugin
```

### Install Dependencies

```bash
npm install
```

### Add Your Dependencies

Install any NPM packages you need:

```bash
# Example: adding popular libraries
npm install axios
npm install lodash
npm install date-fns
```

::: tip
Add packages as regular **dependencies** (not devDependencies). Only dependencies listed in the `dependencies` field will be bundled with your plugin.
:::

### Build and Test

```bash
npm run build
npm test
```

## Apply to Existing Project

You can also apply the template to your existing npm project:

```bash
cd aloha-awesome-plugin
npx degit antarasi/vite-aloha#main .  # Note the dot for current directory
```

## Project Structure

```
your-plugin/
├── src/
│   └── index.esm.ts              # Main plugin entry point (TypeScript)
├── public/
│   └── icon.svg                  # Plugin icon
├── tests/
│   └── validate-export.test.mts  # Example tests
├── dist/                         # Build output (generated)
│   ├── index.esm.js             # Bundled plugin with dependencies
│   ├── index.esm.js.map         # Source map for debugging
│   └── icon.svg                 # Static assets
├── manifest.json                 # Plugin manifest
├── package.json
├── vite.config.ts               # Vite configuration
└── tsconfig.json                # TypeScript configuration
```

## How Dependency Bundling Works

When you run `npm run build`, Vite automatically:

1. ✅ Compiles your TypeScript code to JavaScript
2. ✅ Bundles all dependencies listed in `package.json` dependencies
3. ✅ Tree-shakes unused code for optimal bundle size
4. ✅ Generates optimized ESM output in the `dist/` folder
5. ✅ Copies static assets (like icons) to `dist/`
6. ✅ Creates source maps for debugging

The resulting `dist/index.esm.js` contains all your code and dependencies in a single, optimized file.

## Example with Dependencies

Here's a complete example using axios for HTTP requests:

### Install Dependency

```bash
npm install axios
```

### Use in Your Plugin

```typescript
import { Plugin } from 'aloha-sdk'
import type { PluginContext } from 'aloha-sdk'
import axios from 'axios'

export default class WeatherPlugin extends Plugin {
  private logger

  constructor(context: PluginContext) {
    super(context)
    this.logger = context.getLogger()
  }

  async toolCall(toolName: string, args: { city: string }): Promise<string> {
    if (toolName === 'getWeather') {
      this.logger.info(`Fetching weather for: ${args.city}`)
      
      try {
        const response = await axios.get(
          `https://api.weather.com/current?city=${args.city}`
        )
        
        return `Weather in ${args.city}: ${response.data.description}`
      } catch (error) {
        throw new Error(`Could not get weather for ${args.city}`)
      }
    }

    throw new Error('Unknown tool')
  }
}
```

### Build

```bash
npm run build
```

The built `dist/index.esm.js` will contain your plugin code **and** the axios library bundled together.

## Recommended Practices

1. **Use ES modules** when available (`date-fns`, `lodash-es`)
2. **Import only what you need** from large libraries
3. **Check bundle size** after adding dependencies
4. **Consider alternatives** for large libraries

## Next Steps

- [Publishing Your Plugin](/publishing) - Publish to the marketplace
- [SDK Features - Logging](/logging) - Learn about logging
- [Examples](/examples) - See real-world examples

