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
  transformHead: ({ pageData }) => {
    const head: HeadConfig[] = [];

    if (pageData.frontmatter.description) {
      head.push([
        "meta",
        {
          property: "og:description",
          content: pageData.frontmatter.description,
        },
      ]);
    }

    if (pageData.frontmatter.image) {
      head.push([
        "meta",
        { property: "og:image", content: pageData.frontmatter.image },
      ]);
    }

    head.push([
      "meta",
      {
        property: "og:url",
        content: `https://mmrl.dev${pageData.relativePath}`,
      },
    ]);

    head.push(["meta", { property: "og:type", content: "website" }]);

    head.push(["meta", { property: "og:site_name", content: "MMRL" }]);

    head.push(["meta", { property: "og:locale", content: "en_US" }]);

    head.push(["meta", { name: "twitter:card", content: "summary" }]);

    head.push(["meta", { name: "twitter:site", content: "@Der_Googler" }]);

    head.push(["meta", { name: "twitter:creator", content: "@Der_Googler" }]);

    head.push([
      "meta",
      { name: "twitter:title", content: pageData.frontmatter.title },
    ]);

    head.push([
      "meta",
      {
        name: "twitter:description",
        content: pageData.frontmatter.description,
      },
    ]);

    if (pageData.frontmatter.image) {
      head.push([
        "meta",
        { name: "twitter:image", content: pageData.frontmatter.image },
      ]);

      head.push([
        "meta",
        { name: "twitter:image:alt", content: pageData.frontmatter.title },
      ]);
    }

    return head;
  },
  buildEnd: async (config: SiteConfig) => {
    const publicApi = resolve(config.outDir, "api");
    // const repositoriesYaml = resolve(publicApi, "repositories.yaml");
    const publicRepoList = resolve(publicApi, "gg");

    // const readContent = await readFile(repositoriesYaml, "utf8");
    // const par = parse(readContent);

    console.log("Writing repositories.json");
    await writeFile(publicRepoList, repositoriesJSONstringify);
  },
});
