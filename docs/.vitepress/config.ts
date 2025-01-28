import { defineConfig, SiteConfig } from 'vitepress'
import locales from './locales'

export default defineConfig(
    {
        markdown: {
            lineNumbers: true
        },
        title: 'MMRL',
        locales: locales.locales,
        sitemap: {
            hostname: 'https://mmrl.dev'
        },
        head: [
            [
                'script',
                {
                    async: 'async',
                    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5042729416879007',
                    crossorigin: 'anonymous',
                }
            ],
        ],
    }
)
