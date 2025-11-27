import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  title: "Aloha Desktop Docs",
  description: "Aloha Desktop - a powerful, extendable AI assistant that runs entirely on your computer.",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Examples', link: '/examples' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/getting-started' }
        ]
      },
      {
        text: 'Plugin Development',
        items: [
          { text: 'Plugin Requirements', link: '/plugin-requirements' },
          { text: 'Adding NPM Dependencies', link: '/adding-dependencies' },
          { text: 'Publishing Your Plugin', link: '/publishing' }
        ]
      },
      {
        text: 'SDK',
        items: [
          { text: 'CLI', link: '/cli' },
          { text: 'Logging', link: '/logging' },
          { text: 'Rendering Web Content', link: '/rendering-web-content' }
        ]
      },
      {
        text: 'Resources',
        items: [
          { text: 'Examples', link: '/examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/antarasi/aloha-releases' }
    ],

    editLink: {
      pattern: 'https://github.com/antarasi/aloha-docs/edit/main/docs/:path'
    },

    search: {
      provider: 'local'
    }
  }
})
