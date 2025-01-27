import { defineConfig, SiteConfig } from 'vitepress'
import locales from './locales'

export default defineConfig( {
    title: 'MMRL',
    locales: locales.locales,
    sitemap: {
        hostname: 'https://mmrlapp.github.io'
    },
})
