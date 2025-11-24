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
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/antarasi/aloha-releases' }
    ],

    editLink: {
      pattern: 'https://github.com/antarasi/aloha-docs/edit/main/docs/:path'
    }
  }
})
