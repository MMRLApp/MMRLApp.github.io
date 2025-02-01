import { defineConfig, HeadConfig, SiteConfig } from "vitepress";
import locales from "./locales";
import ViteYaml from "@modyfi/vite-plugin-yaml";
import { writeFile, readFile } from "fs/promises";
import { parse } from "yaml";
import { resolve } from "path";
import { repositoriesJSONstringify } from "../data/repositories";

export default defineConfig({
  vite: {
    plugins: [ViteYaml()],
  },
  markdown: {
    lineNumbers: true,
  },
  title: "MMRL",
  locales: locales.locales,
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
  buildEnd: async (config: SiteConfig) => {
    const publicApi = resolve(config.outDir, "api");
    const publicRepoList = resolve(publicApi, "repositories.json");

    console.log("Writing repositories.json");
    await writeFile(publicRepoList, repositoriesJSONstringify);
  },
});
