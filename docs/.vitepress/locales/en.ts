import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

export default defineConfig({
  lang: 'en-US',
  description: 'Build your own modules repository',

  themeConfig: {
    nav: nav(),

    lastUpdatedText: 'last Updated',

    sidebar: {
      '/guide/': sidebarGuide(),
      '/home/': sidebarHome()
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/MMRLApp/MMRL' },
      { icon: 'googleplay', link: 'https://play.google.com/store/apps/details?id=com.dergoogler.mmrl' }
    ],

    footer: {
        message: 'Released under the GPL3 License.',
        copyright: 'Copyright © 2022-present Der_Googler and its contributors'
    },

    editLink: {
        pattern: 'https://github.com/MMRLApp/MMRLApp.github.io/edit/master/docs/:path',
        text: 'Edit this page on GitHub'
    }
  }
})

function nav() {
  return [
    { text: 'Home', link: '/home/repositories' },
    { text: 'Guide', link: '/guide/index' },
  ]
}

function sidebarGuide() {
  return [
    {
        text: 'Guide',
        items: [
          { text: 'Module WebUI', link: '/guide/module-webui.md' },
          { text: 'FAQ', link: '/guide/faq' },
        ]
    }
  ]
}


function sidebarHome() {
  return [
    {
        text: 'Home',
        items: [
          { text: 'Repositories', link: '/home/repositories' },
        ]
    }
  ]
}
