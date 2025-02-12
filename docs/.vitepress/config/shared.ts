// Plugins
import ViteYaml from "@modyfi/vite-plugin-yaml";
import { pagefindPlugin } from "vitepress-plugin-pagefind";
// Imports
import { defineConfig, SiteConfig } from "vitepress";
import { writeFile, unlink } from "fs/promises";
import { resolve } from "path";
import { blacklistJSONstringify } from "../../data/blacklist";
import { changelogJSONstringify } from "../../data/changelog";
import repositories from "../../../meta/repositories.json";
import sponsors from "../../../meta/sponsors.json";
import { getAllContributorsRecursive } from "../../data/contributors.data";

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
    const placeholder = resolve(publicApi, "placeholder");
    const publicRepoList = resolve(publicApi, "repositories.json");
    const publicSponList = resolve(publicApi, "sponsors.json");
    const publicConList = resolve(publicApi, "contributors.json");
    const publicBlackList = resolve(publicApi, "blacklist.json");
    const publicChangelogList = resolve(publicApi, "changelog.json");

    const newRepositories = repositories.map(async (repo) => {
      const response = await (await fetch(`${repo.url}json/modules.json`)).json();
      const modulesCount = response.modules.length;

      return {
        ...repo,
        modules_count: modulesCount,
        submission: response.submission,
        cover: response.cover,
        timestamp: response.metadata.timestamp,
        description: response.description,
        donate: response.donate,
      };
    });

    const newContributors = async () => {
      const contributors = await getAllContributorsRecursive("MMRLApp/MMRL");

      const excludedContributors = [/DerGoogler/i, /dependabot(-preview)?\[bot\]/i, /(weblate(\[bot\])?|WeblateAdmin)/i];

      const contributorsExluded = contributors.filter((con) => !excludedContributors.some((exc) => con.match(exc)));

      return contributorsExluded.map((contributor) => {
        return {
          avatarUrl: contributor.avatar_url,
          login: contributor.login,
          url: contributor.html_url,
          contributions: contributor.contributions,
        };
      });
    };

    await writeFile(publicRepoList, JSON.stringify(await Promise.all(newRepositories), null, 4));
    await writeFile(publicSponList, JSON.stringify(await Promise.all(sponsors), null, 4));
    await writeFile(publicConList, JSON.stringify(await newContributors(), null, 4));
    await writeFile(publicBlackList, blacklistJSONstringify);
    await writeFile(publicChangelogList, changelogJSONstringify);
    await unlink(placeholder);
  },
});
