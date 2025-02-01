import { defineConfig, SiteConfig } from "vitepress";
import ViteYaml from "@modyfi/vite-plugin-yaml";
import { writeFile } from "fs/promises";
import { resolve } from "path";
import { repositoriesJSONstringify } from "../../data/repositories";
import { blacklistJSONstringify } from "../../data/blacklist";

export const shared = defineConfig({
  vite: {
    plugins: [ViteYaml()],
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

    await writeFile(publicRepoList, repositoriesJSONstringify);
    await writeFile(publicBlackList, blacklistJSONstringify);
  },
});
