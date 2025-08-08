import { createRequire } from "module";
import { defineConfig } from "vitepress";
import request from "sync-request";
import { repositories, Repository } from "../../data/repositories";
import { changelog } from "../../data/changelog";

const require = createRequire(import.meta.url);
const pkg = require("vitepress/package.json");

export default defineConfig({
  lang: "en-US",
  description: "Build your own modules repository",

  themeConfig: {
    nav: nav(),

    lastUpdatedText: "last Updated",

    sidebar: {
      "/guide/": sidebarGuide(),
      "/repository/": sidebarRepositories(),
      "/changelog/": sidebarChangelog(),
      "/legal/": sidebarLegal(),
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/MMRLApp/MMRL" },
      {
        icon: "googleplay",
        link: "https://play.google.com/store/apps/details?id=com.dergoogler.mmrl",
      },
    ],

    footer: {
      message: "Released under the GPL3 License.",
      copyright: "Copyright © 2022-present Der_Googler and its contributors",
    },

    editLink: {
      pattern: "https://github.com/MMRLApp/MMRLApp.github.io/edit/master/docs/:path",
      text: "Edit this page on GitHub",
    },
  },
});

function nav() {
  return [
    {
      text: "Guide",
      link: "/guide",
      activeMatch: "/guide/",
    },
    {
      text: "Repositories",
      link: "/repository",
      activeMatch: "/repository/",
    },
    {
      text: "More",
      items: [
        {
          text: "Downloads",
          link: "/downloads",
          activeMatch: "/downloads/",
        },
        {
          text: "Blacklist",
          link: "/blacklist",
          activeMatch: "/blacklist/",
        },
        {
          text: "Changelog",
          link: `/changelog/${changelog[0].versionCode}`,
          activeMatch: "/changelog/",
        },
      ],
    },
    {
      text: "Thank You",
      link: "/thankyou",
      activeMatch: "/thankyou/",
    },
    {
      text: "Legal",
      link: "/legal/privacy",
      activeMatch: "/legal/",
    },
  ];
}

function sidebarGuide() {
  return [
    {
      text: "Introduction",
      collapsed: false,
      items: [
        { text: "What is MMRL", link: "/guide/" },
        { text: "How a Module Card Works", link: "/guide/how-a-module-card-works" },
        { text: "Anti-Features", link: "/guide/antifeatures" },
        { text: "Text Formatting", link: "/guide/text-formatting" },
        { text: "Installer API", link: "/guide/installer" },
        { text: "FAQ", link: "/guide/faq" },
      ],
    },
    {
      text: "WebUI X",
      collapsed: false,
      items: [
        {
          text: "API",
          collapsed: true,
          items: [
            { text: "ModuleInterface", link: "/guide/webuix/api/ModuleInterface" },
            { text: "FileInterface", link: "/guide/webuix/api/FileInterface" },
            { text: "FileInputInterface", link: "/guide/webuix/api/FileInputInterface" },
            { text: "ApplicationInterface", link: "/guide/webuix/api/ApplicationInterface" },
            { text: "UserManagerInterface", link: "/guide/webuix/api/UserManagerInterface" },
            { text: "PackageManagerInterface", link: "/guide/webuix/api/PackageManagerInterface" },
          ],
        },
        { text: "What is WebUI X", link: "/guide/webuix" },
        { text: "Index Setup", link: "/guide/webuix/index-setup" },
        { text: "Application Info Flags", link: "/guide/webuix/application-info-flags" },
        { text: "Config", link: "/guide/webuix/config" },
        { text: "Events", link: "/guide/webuix/events" },
        { text: "Sanitized Module ID's", link: "/guide/webuix/sanitized-ids" },
        { text: "Shortcuts", link: "/guide/webuix/shortcuts" },
      ],
    },
    {
      text: "MMRL-Util",
      collapsed: false,
      items: [
        { text: "Getting Started", link: "/guide/mmrl-util/" },
        { text: "repo.json", link: "/guide/mmrl-util/repo-json" },
        { text: "track.json", link: "/guide/mmrl-util/track-json" },
        { text: "config.json", link: "/guide/mmrl-util/config-json" },
      ],
    },
  ];
}

function sidebarLegal() {
  return [
    {
      text: "Legal",
      items: [
        { text: "Privacy Policy", link: "/legal/privacy" },
        { text: "Terms of Service", link: "/legal/terms" },
        { text: "Chat Rules", link: "/legal/chat-rules" },
      ],
    },
  ];
}

function repos() {
  return repositories.map((repo) => {
    const r = new Repository(repo.url);

    const response = request("GET", `${repo.url}json/modules.json`);
    const rep = JSON.parse(response.getBody("utf8"));
    const modules = rep.modules.map((module) => {
      return {
        text: module.name,
        link: `/repository/${r.id}/${module.id}`,
      };
    });

    return {
      text: repo.name,
      link: `/repository/${r.id}`,
      collapsed: true,
      items: modules,
    };
  });
}

function sidebarRepositories() {
  return [
    {
      text: "Repositories",
      items: repos(),
    },
  ];
}

function sidebarChangelog() {
  return [
    {
      text: "Changelog",
      items: changelog.map((log) => {
        const spanCss = `
          border-color: var(--vp-badge-warning-border);
          color: var(--vp-badge-warning-text);
          background-color: var(--vp-badge-warning-bg);
          display: inline-block;
          border: 1px solid transparent;
          border-radius: 12px;
          padding: 0 10px;
          line-height: 22px;
          font-size: 12px;
          font-weight: 500;
          transform: translateY(-2px);
        `;

        return {
          text: `${log.versionName} (${log.versionCode}) ${log.preRelease ? `<span style="${spanCss}">PR</span>` : ""}`,
          link: `/changelog/${log.versionCode}`,
        };
      }),
    },
  ];
}
