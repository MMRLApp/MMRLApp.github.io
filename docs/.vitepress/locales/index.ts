import { defineConfig } from 'vitepress'
import en from './en'

export default defineConfig({
  locales: {
    root: {
      label: 'English',
      lang: en.lang,
      themeConfig: en.themeConfig,
      description: en.description
    }
  }
})
