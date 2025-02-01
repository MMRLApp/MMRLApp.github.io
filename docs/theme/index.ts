import DefaultTheme from 'vitepress/theme'
import Repository from '../layouts/Repository.vue'
import CustomLayout from '../layouts/CustomLayout.vue'
import Theme from 'vitepress/theme'

// export default {
//   extends: DefaultTheme,
//   enhanceApp({ app }) {
//     app.component('repository', Repository)
//     app.component('custonlayout', Custom)
//   }
// }

export default {
    ...Theme,
    Layout: CustomLayout,
  }