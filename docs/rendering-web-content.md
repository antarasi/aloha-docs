# Rendering Web Content

When building plugins that interact with web services, you have two main options for fetching content: standard `fetch()` for raw content or `renderUrl()` for browser-rendered content.

## Standard fetch() - Raw Content

Using JavaScript's built-in `fetch()` retrieves the raw text content without executing any JavaScript:

```typescript
const response = await fetch('https://example.com/api/data')
const html = await response.text()
```

### When to Use fetch()

- ✅ Fetching from REST APIs that return JSON
- ✅ Getting static HTML content
- ✅ The content doesn't require JavaScript to render
- ✅ You need precise control over HTTP headers and options
- ✅ Working with APIs, not web pages

### Example with fetch()

```typescript
import { Plugin } from 'aloha-sdk'
import type { PluginContext } from 'aloha-sdk'

export default class NewsPlugin extends Plugin {
  constructor(context: PluginContext) {
    super(context)
  }

  async toolCall(toolName: string, args: Record<string, any>): Promise<string> {
    if (toolName === 'getNews') {
      // Fetch JSON from API
      const response = await fetch('https://api.news.com/latest')
      const data = await response.json()
      
      return `Latest headlines: ${data.articles.map(a => a.title).join(', ')}`
    }

    throw new Error('Unknown tool')
  }
}
```

## renderUrl() - Browser-Rendered Content

The `renderUrl()` method from `PluginContext` renders the URL in a real browser environment and returns the final rendered content after JavaScript execution:

```typescript
const renderedContent = await this.getContext().renderUrl('https://example.com')
```

### When to Use renderUrl()

- ✅ The page requires JavaScript to render content
- ✅ You need to see what a user would see in a browser
- ✅ Working with single-page applications (SPAs)
- ✅ The content is loaded dynamically (AJAX, React, Vue, etc.)
- ✅ Interacting with client-side rendered content

### Example with renderUrl()

```typescript
import { Plugin } from 'aloha-sdk'
import type { PluginContext } from 'aloha-sdk'

export default class WebScraperPlugin extends Plugin {
  constructor(context: PluginContext) {
    super(context)
  }

  async toolCall(toolName: string, args: { url: string }): Promise<string> {
    if (toolName === 'visitWebsite') {
      // Render page in browser and get final HTML
      const renderedContent = await this.getContext().renderUrl(args.url)
      
      // Now you can parse the fully rendered content
      return this.extractContent(renderedContent)
    }

    throw new Error('Unknown tool')
  }

  private extractContent(html: string): string {
    // Parse the rendered HTML
    // Extract the information you need
    return 'Extracted content'
  }
}
```

::: tip
Note, that Aloha Desktop doesn't show the browser window to the user while rendering. It renders the content in the background and returns the content to the plugin.
:::


## Parsing Rendered HTML

Once you have the rendered content, you might want to parse it. 

We recommend using [cheerio](https://www.npmjs.com/package/cheerio) for HTML parsing. You can bundle in cheerio as a dependency of your plugin using [vite-aloha](https://github.com/antarasi/vite-aloha)

### Install Cheerio

First, add cheerio to your plugin project:

```bash
npm install cheerio
```

### Example with Cheerio

Here's a complete example that renders a page and extracts structured data:

```typescript
import { Plugin } from 'aloha-sdk'
import type { PluginContext } from 'aloha-sdk'
import * as cheerio from 'cheerio'

export default class ArticleScraperPlugin extends Plugin {
  private logger

  constructor(context: PluginContext) {
    super(context)
    this.logger = context.getLogger()
  }

  async toolCall(toolName: string, args: { url: string }): Promise<string> {
    if (toolName === 'scrapeArticles') {
      this.logger.info(`Scraping articles from: ${args.url}`)
      
      try {
        // Render the page in browser to get JavaScript-generated content
        const renderedHtml = await this.getContext().renderUrl(args.url)
        
        // Parse the HTML with cheerio
        const $ = cheerio.load(renderedHtml)
        
        // Extract article titles and links
        const articles: Array<{ title: string; link: string }> = []
        
        $('article').each((_, element) => {
          const title = $(element).find('h2').text().trim()
          const link = $(element).find('a').attr('href')
          
          if (title && link) {
            articles.push({ title, link })
          }
        })
        
        // Format the results
        if (articles.length === 0) {
          return 'No articles found on the page.'
        }
        
        return articles
          .map((article, idx) => `${idx + 1}. ${article.title}\n   ${article.link}`)
          .join('\n\n')
          
      } catch (error) {
        throw new Error(`Could not scrape articles from ${args.url}`)
      }
    }

    throw new Error('Unknown tool')
  }
}
```

### Other examples

- [aloha-visit-website](https://github.com/antarasi/aloha-visit-website) plugin uses `renderUrl` and `cheerio` to extract HTML from visited websites and filter out irrelevant tags.
- [aloha-internet-search](https://github.com/antarasi/aloha-internet-search) plugin uses `renderUrl` and `cheerio` to extract search result titles and links.


## Next Steps

- [Adding NPM Dependencies](/adding-dependencies) - Learn how to bundle dependencies
- [Logging](/logging) - Implement proper logging
- [Plugin Requirements](/plugin-requirements) - Review all requirements
- [Examples](/examples) - See real-world implementations

