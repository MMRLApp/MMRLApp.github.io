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
    build: {
      // Optimize assets for better performance
      minify: "terser",
      cssMinify: true,
      // Optimize chunk size for better loading
      chunkSizeWarningLimit: 1000,
    },
  },
  markdown: {
    lineNumbers: true,
  },
  rewrites: {
    "en/:rest*": ":rest*",
  },
  cleanUrls: true,
  title: "MMRL",
  description:
    "MMRL - A decentralized ecosystem for sharing, distributing, and discovering Magisk modules. Comprehensive root manager support for Magisk, KernelSU, and APatch.",
  sitemap: {
    hostname: "https://mmrl.dev",
  },
  head: [
    // Favicon and App Icons
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "apple-touch-icon", href: "/VitePressLogo-512px.webp" }],

    // SEO Meta Tags
    [
      "meta",
      {
        name: "keywords",
        content: "MMRL, Magisk modules, KernelSU, APatch, Android root, module repository, Magisk Module Repo Loader, module management",
      },
    ],
    ["meta", { name: "author", content: "Der_Googler and MMRL Contributors" }],
    ["meta", { name: "robots", content: "index, follow" }],
    ["meta", { name: "googlebot", content: "index, follow" }],

    // Open Graph / Facebook
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:url", content: "https://mmrl.dev" }],
    ["meta", { property: "og:title", content: "MMRL - Magisk Module Repo Loader" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "A decentralized ecosystem for sharing, distributing, and discovering Magisk modules with comprehensive root manager support.",
      },
    ],
    ["meta", { property: "og:image", content: "https://mmrl.dev/VitePressLogo-512px.webp" }],
    ["meta", { property: "og:site_name", content: "MMRL" }],

    // Twitter Card
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:url", content: "https://mmrl.dev" }],
    ["meta", { name: "twitter:title", content: "MMRL - Magisk Module Repo Loader" }],
    [
      "meta",
      {
        name: "twitter:description",
        content:
          "A decentralized ecosystem for sharing, distributing, and discovering Magisk modules with comprehensive root manager support.",
      },
    ],
    ["meta", { name: "twitter:image", content: "https://mmrl.dev/VitePressLogo-512px.webp" }],

    // Mobile Optimization
    ["meta", { name: "viewport", content: "width=device-width, initial-scale=1.0, viewport-fit=cover" }],
    ["meta", { name: "mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" }],

    // Theme Color
    ["meta", { name: "theme-color", content: "#3eaf7c" }],

    // Canonical URL (will be set per page by VitePress)
    ["link", { rel: "canonical", href: "https://mmrl.dev" }],

    // Structured Data - Organization
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "MMRL",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Android",
        description: "Magisk Module Repo Loader - A decentralized ecosystem for sharing, distributing, and discovering Magisk modules",
        url: "https://mmrl.dev",
        author: {
          "@type": "Person",
          name: "Der_Googler",
        },
        license: "GLPv3",
        softwareHelp: {
          "@type": "WebSite",
          url: "https://github.com/MMRLApp/MMRL/issues",
        },
      }),
    ],

    // Google Ads
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
  transformHead({ pageData }) {
    // Add canonical URL for each page
    const canonicalUrl = `https://mmrl.dev/${pageData.relativePath.replace(/\.md$/, "")}`;

    return [
      ["link", { rel: "canonical", href: canonicalUrl }],
      // Add page-specific Open Graph tags
      ["meta", { property: "og:url", content: canonicalUrl }],
      ["meta", { property: "og:title", content: pageData.title }],
      [
        "meta",
        {
          property: "og:description",
          content: pageData.description || pageData.frontmatter?.description || "MMRL - Magisk Module Repo Loader",
        },
      ],
    ];
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
