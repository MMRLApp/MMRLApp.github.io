import { defineConfig } from 'vitepress'
import en from './en'
import { shared } from './shared'

export default defineConfig({
  ...shared,
  locales: {
    root: {
      label: 'English',
      lang: en.lang,
      themeConfig: en.themeConfig,
      description: en.description
    }
  }
})
