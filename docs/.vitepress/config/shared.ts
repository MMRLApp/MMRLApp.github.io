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
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8761428581890299",
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

      const contributorsExluded = contributors.filter((con) => !excludedContributors.some((exc) => con.login.match(exc)));

      return contributorsExluded.map((contributor) => {
        return {
          avatarUrl: contributor.avatar_url,
          login: contributor.login,
          url: contributor.html_url,
          contributions: contributor.contributions,
        };
      });
    };

    const newReleases = async () => {
      const releases = await (await fetch("https://api.github.com/repos/MMRLApp/MMRL/releases")).json();

      const bodyMatcher = (body: string) => {
        const match = body.match(/## What's new\?\n([\s\S]*?)(\n{2,}|$)/);
        return match ? match[1].trim() : "No Changes found";
      };

      return releases
        .filter((release: any) => release.tag_name.match(/^v(\d+)$/))
        .map((release: any) => ({
          versionName: release.tag_name,
          versionCode: parseInt(release.tag_name.replace("v", "")),
          preRelease: release.prerelease,
          changes: bodyMatcher(release.body),
        }));
    };

    await writeFile(publicRepoList, JSON.stringify(await Promise.all(newRepositories), null, 4));
    await writeFile(publicSponList, JSON.stringify(await Promise.all(sponsors), null, 4));
    await writeFile(publicConList, JSON.stringify(await newContributors(), null, 4));
    await writeFile(publicBlackList, blacklistJSONstringify);
    await writeFile(publicChangelogList, JSON.stringify(await newReleases(), null, 4));
    await unlink(placeholder);
  },
});
