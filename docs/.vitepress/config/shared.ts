// Plugins
import ViteYaml from "@modyfi/vite-plugin-yaml";
import { pagefindPlugin } from "vitepress-plugin-pagefind";
// Imports
import { defineConfig, SiteConfig } from "vitepress";
import { writeFile, copyFile } from "fs/promises";
import { resolve } from "path";
import { blacklistJSONstringify } from "../../data/blacklist";
import { changelogJSONstringify } from "../../data/changelog";


export const shared = defineConfig({
  vite: {
    plugins: [ViteYaml(), pagefindPlugin()],
  },
  markdown: {
    lineNumbers: true,
  },
  rewrites: {
    "en/:rest*": ":rest*",
  },
  cleanUrls: true,
  title: "MMRL",
  sitemap: {
    hostname: "https://mmrl.dev",
  },
  head: [
    [
      "script",
      {
        async: "async",
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5042729416879007",
        crossorigin: "anonymous",
      },
    ],
  ],
  themeConfig: {
    search: {
      provider: "local",
    },
  },
  transformPageData(pageData, ctx) {
    if (pageData.params?.title) {
      pageData.title = pageData.params.title;
    }

    if (pageData.params?.description) {
      pageData.description = pageData.params.description;
    }
  },
  buildEnd: async (config: SiteConfig) => {
    const publicApi = resolve(config.outDir, "api");
    const publicRepoList = resolve(publicApi, "repositories.json");
    const publicBlackList = resolve(publicApi, "blacklist.json");
    const publicChangelogList = resolve(publicApi, "changelog.json");

    await copyFile(resolve(__dirname, "../../../meta/repositories.json"), publicRepoList);
    await writeFile(publicBlackList, blacklistJSONstringify);
    await writeFile(publicChangelogList, changelogJSONstringify);
  },
});
