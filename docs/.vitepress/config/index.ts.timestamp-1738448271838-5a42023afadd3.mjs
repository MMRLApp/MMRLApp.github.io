// docs/.vitepress/config/index.ts
import { defineConfig as defineConfig3 } from "file:///D:/GitHub/MMRLApp.github.io/node_modules/vitepress/dist/node/index.js";

// docs/.vitepress/config/en.ts
import { createRequire } from "module";
import { defineConfig } from "file:///D:/GitHub/MMRLApp.github.io/node_modules/vitepress/dist/node/index.js";
import request from "file:///D:/GitHub/MMRLApp.github.io/node_modules/sync-request/lib/index.js";

// docs/data/repositories.ts
import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "file:///D:/GitHub/MMRLApp.github.io/node_modules/yaml/dist/index.js";
var __vite_injected_original_dirname = "D:\\GitHub\\MMRLApp.github.io\\docs\\data";
var fileName = join(__vite_injected_original_dirname, "repositories.yaml");
var repositories = parse(readFileSync(fileName, "utf8"));
var repositoriesJSONstringify = JSON.stringify(
  repositories,
  null,
  4
);

// docs/.vitepress/config/en.ts
var __vite_injected_original_import_meta_url = "file:///D:/GitHub/MMRLApp.github.io/docs/.vitepress/config/en.ts";
var require2 = createRequire(__vite_injected_original_import_meta_url);
var pkg = require2("vitepress/package.json");
var en_default = defineConfig({
  lang: "en-US",
  description: "Build your own modules repository",
  themeConfig: {
    nav: nav(),
    lastUpdatedText: "last Updated",
    sidebar: {
      "/guide/": sidebarGuide(),
      "/repository/": sidebarRepositories(),
      "/legal/": sidebarLegal()
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/MMRLApp/MMRL" },
      {
        icon: "googleplay",
        link: "https://play.google.com/store/apps/details?id=com.dergoogler.mmrl"
      }
    ],
    footer: {
      message: "Released under the GPL3 License.",
      copyright: "Copyright \xA9 2022-present Der_Googler and its contributors"
    },
    editLink: {
      pattern: "https://github.com/MMRLApp/MMRLApp.github.io/edit/master/docs/:path",
      text: "Edit this page on GitHub"
    }
  }
});
function nav() {
  return [
    { text: "Guide", link: "/guide" },
    { text: "Repositories", link: "/repository" },
    { text: "Legal", link: "/legal/privacy" }
  ];
}
function sidebarGuide() {
  return [
    {
      text: "Guide",
      items: [
        { text: "What is MMRL", link: "/guide/" },
        { text: "Anti-Features", link: "/guide/antifeatures" },
        { text: "Installer API", link: "/guide/installer" },
        {
          text: "WebUI",
          collapsed: true,
          items: [
            { text: "Getting Started in WebUI", link: "/guide/webui/" },
            {
              text: "API",
              collapsed: true,
              items: [
                { text: "FileSystem", link: "/guide/webui/api/filesystem" },
                {
                  text: "MMRLInterface",
                  link: "/guide/webui/api/mmrlinterface"
                },
                { text: "Toast", link: "/guide/webui/api/toast" },
                {
                  text: "VersionInterface",
                  link: "/guide/webui/api/versioninterface"
                }
              ]
            }
          ]
        },
        {
          text: "MMRL-Util",
          collapsed: true,
          items: [
            { text: "Getting Started", link: "/guide/mmrl-util/" },
            { text: "repo.json", link: "/guide/mmrl-util/repo-json" },
            { text: "track.json", link: "/guide/mmrl-util/track-json" },
            { text: "config.json", link: "/guide/mmrl-util/config-json" }
          ]
        },
        { text: "FAQ", link: "/guide/faq" }
      ]
    }
  ];
}
function sidebarLegal() {
  return [
    {
      text: "Legal",
      items: [
        { text: "Privacy Policy", link: "/legal/privacy" },
        { text: "Terms of Service", link: "/legal/terms" },
        { text: "Chat Rules", link: "/legal/chat-rules" }
      ]
    }
  ];
}
function repos() {
  return repositories.map((repo) => {
    const response = request("GET", `${repo.url}json/modules.json`);
    const rep = JSON.parse(response.getBody("utf8"));
    const modules = rep.modules.map((module) => {
      return {
        text: module.name,
        link: `/repository/${repo.id}/${module.id}`
      };
    });
    return {
      text: repo.name,
      link: `/repository/${repo.id}`,
      collapsed: true,
      items: modules
    };
  });
}
function sidebarRepositories() {
  return [
    {
      text: "Repositories",
      items: repos()
    }
  ];
}

// docs/.vitepress/config/shared.ts
import { defineConfig as defineConfig2 } from "file:///D:/GitHub/MMRLApp.github.io/node_modules/vitepress/dist/node/index.js";
import ViteYaml from "file:///D:/GitHub/MMRLApp.github.io/node_modules/@modyfi/vite-plugin-yaml/dist/index.js";
import { writeFile } from "fs/promises";
import { resolve } from "path";

// docs/data/blacklist.ts
import { readFileSync as readFileSync2 } from "fs";
import { join as join2 } from "path";
import { parse as parse2 } from "file:///D:/GitHub/MMRLApp.github.io/node_modules/yaml/dist/index.js";
var __vite_injected_original_dirname2 = "D:\\GitHub\\MMRLApp.github.io\\docs\\data";
var fileName2 = join2(__vite_injected_original_dirname2, "blacklist.yaml");
var blacklist = parse2(readFileSync2(fileName2, "utf8"));
var blacklistJSONstringify = JSON.stringify(
  blacklist,
  null,
  4
);

// docs/.vitepress/config/shared.ts
var shared = defineConfig2({
  vite: {
    plugins: [ViteYaml()]
  },
  markdown: {
    lineNumbers: true
  },
  rewrites: {
    "en/:rest*": ":rest*"
  },
  cleanUrls: true,
  title: "MMRL",
  sitemap: {
    hostname: "https://mmrl.dev"
  },
  head: [
    [
      "script",
      {
        async: "async",
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5042729416879007",
        crossorigin: "anonymous"
      }
    ]
  ],
  transformPageData(pageData, ctx) {
    if (pageData.params?.title) {
      pageData.title = pageData.params.title;
    }
    if (pageData.params?.description) {
      pageData.description = pageData.params.description;
    }
  },
  buildEnd: async (config) => {
    const publicApi = resolve(config.outDir, "api");
    const publicRepoList = resolve(publicApi, "repositories.json");
    const publicBlackList = resolve(publicApi, "blacklist.json");
    await writeFile(publicRepoList, repositoriesJSONstringify);
    await writeFile(publicBlackList, blacklistJSONstringify);
  }
});

// docs/.vitepress/config/index.ts
var config_default = defineConfig3({
  ...shared,
  locales: {
    root: {
      label: "English",
      lang: en_default.lang,
      themeConfig: en_default.themeConfig,
      description: en_default.description
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy9pbmRleC50cyIsICJkb2NzLy52aXRlcHJlc3MvY29uZmlnL2VuLnRzIiwgImRvY3MvZGF0YS9yZXBvc2l0b3JpZXMudHMiLCAiZG9jcy8udml0ZXByZXNzL2NvbmZpZy9zaGFyZWQudHMiLCAiZG9jcy9kYXRhL2JsYWNrbGlzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXEdpdEh1YlxcXFxNTVJMQXBwLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxHaXRIdWJcXFxcTU1STEFwcC5naXRodWIuaW9cXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovR2l0SHViL01NUkxBcHAuZ2l0aHViLmlvL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvaW5kZXgudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnXG5pbXBvcnQgZW4gZnJvbSAnLi9lbidcbmltcG9ydCB7IHNoYXJlZCB9IGZyb20gJy4vc2hhcmVkJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAuLi5zaGFyZWQsXG4gIGxvY2FsZXM6IHtcbiAgICByb290OiB7XG4gICAgICBsYWJlbDogJ0VuZ2xpc2gnLFxuICAgICAgbGFuZzogZW4ubGFuZyxcbiAgICAgIHRoZW1lQ29uZmlnOiBlbi50aGVtZUNvbmZpZyxcbiAgICAgIGRlc2NyaXB0aW9uOiBlbi5kZXNjcmlwdGlvblxuICAgIH1cbiAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcR2l0SHViXFxcXE1NUkxBcHAuZ2l0aHViLmlvXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEdpdEh1YlxcXFxNTVJMQXBwLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXFxcXGVuLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9HaXRIdWIvTU1STEFwcC5naXRodWIuaW8vZG9jcy8udml0ZXByZXNzL2NvbmZpZy9lbi50c1wiO2ltcG9ydCB7IGNyZWF0ZVJlcXVpcmUgfSBmcm9tIFwibW9kdWxlXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZXByZXNzXCI7XG5pbXBvcnQgcmVxdWVzdCBmcm9tIFwic3luYy1yZXF1ZXN0XCI7XG5pbXBvcnQgeyByZXBvc2l0b3JpZXMgfSBmcm9tIFwiLi4vLi4vZGF0YS9yZXBvc2l0b3JpZXNcIjtcblxuY29uc3QgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUoaW1wb3J0Lm1ldGEudXJsKTtcbmNvbnN0IHBrZyA9IHJlcXVpcmUoXCJ2aXRlcHJlc3MvcGFja2FnZS5qc29uXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBsYW5nOiBcImVuLVVTXCIsXG4gIGRlc2NyaXB0aW9uOiBcIkJ1aWxkIHlvdXIgb3duIG1vZHVsZXMgcmVwb3NpdG9yeVwiLFxuXG4gIHRoZW1lQ29uZmlnOiB7XG4gICAgbmF2OiBuYXYoKSxcblxuICAgIGxhc3RVcGRhdGVkVGV4dDogXCJsYXN0IFVwZGF0ZWRcIixcblxuICAgIHNpZGViYXI6IHtcbiAgICAgIFwiL2d1aWRlL1wiOiBzaWRlYmFyR3VpZGUoKSxcbiAgICAgIFwiL3JlcG9zaXRvcnkvXCI6IHNpZGViYXJSZXBvc2l0b3JpZXMoKSxcbiAgICAgIFwiL2xlZ2FsL1wiOiBzaWRlYmFyTGVnYWwoKSxcbiAgICB9LFxuXG4gICAgc29jaWFsTGlua3M6IFtcbiAgICAgIHsgaWNvbjogXCJnaXRodWJcIiwgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vTU1STEFwcC9NTVJMXCIgfSxcbiAgICAgIHtcbiAgICAgICAgaWNvbjogXCJnb29nbGVwbGF5XCIsXG4gICAgICAgIGxpbms6IFwiaHR0cHM6Ly9wbGF5Lmdvb2dsZS5jb20vc3RvcmUvYXBwcy9kZXRhaWxzP2lkPWNvbS5kZXJnb29nbGVyLm1tcmxcIixcbiAgICAgIH0sXG4gICAgXSxcblxuICAgIGZvb3Rlcjoge1xuICAgICAgbWVzc2FnZTogXCJSZWxlYXNlZCB1bmRlciB0aGUgR1BMMyBMaWNlbnNlLlwiLFxuICAgICAgY29weXJpZ2h0OiBcIkNvcHlyaWdodCBcdTAwQTkgMjAyMi1wcmVzZW50IERlcl9Hb29nbGVyIGFuZCBpdHMgY29udHJpYnV0b3JzXCIsXG4gICAgfSxcblxuICAgIGVkaXRMaW5rOiB7XG4gICAgICBwYXR0ZXJuOlxuICAgICAgICBcImh0dHBzOi8vZ2l0aHViLmNvbS9NTVJMQXBwL01NUkxBcHAuZ2l0aHViLmlvL2VkaXQvbWFzdGVyL2RvY3MvOnBhdGhcIixcbiAgICAgIHRleHQ6IFwiRWRpdCB0aGlzIHBhZ2Ugb24gR2l0SHViXCIsXG4gICAgfSxcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBuYXYoKSB7XG4gIHJldHVybiBbXG4gICAgeyB0ZXh0OiBcIkd1aWRlXCIsIGxpbms6IFwiL2d1aWRlXCIgfSxcbiAgICB7IHRleHQ6IFwiUmVwb3NpdG9yaWVzXCIsIGxpbms6IFwiL3JlcG9zaXRvcnlcIiB9LFxuICAgIHsgdGV4dDogXCJMZWdhbFwiLCBsaW5rOiBcIi9sZWdhbC9wcml2YWN5XCIgfSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gc2lkZWJhckd1aWRlKCkge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHRleHQ6IFwiR3VpZGVcIixcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgdGV4dDogXCJXaGF0IGlzIE1NUkxcIiwgbGluazogXCIvZ3VpZGUvXCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIkFudGktRmVhdHVyZXNcIiwgbGluazogXCIvZ3VpZGUvYW50aWZlYXR1cmVzXCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIkluc3RhbGxlciBBUElcIiwgbGluazogXCIvZ3VpZGUvaW5zdGFsbGVyXCIgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiV2ViVUlcIixcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogXCJHZXR0aW5nIFN0YXJ0ZWQgaW4gV2ViVUlcIiwgbGluazogXCIvZ3VpZGUvd2VidWkvXCIgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogXCJBUElcIixcbiAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogXCJGaWxlU3lzdGVtXCIsIGxpbms6IFwiL2d1aWRlL3dlYnVpL2FwaS9maWxlc3lzdGVtXCIgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiBcIk1NUkxJbnRlcmZhY2VcIixcbiAgICAgICAgICAgICAgICAgIGxpbms6IFwiL2d1aWRlL3dlYnVpL2FwaS9tbXJsaW50ZXJmYWNlXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6IFwiVG9hc3RcIiwgbGluazogXCIvZ3VpZGUvd2VidWkvYXBpL3RvYXN0XCIgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiBcIlZlcnNpb25JbnRlcmZhY2VcIixcbiAgICAgICAgICAgICAgICAgIGxpbms6IFwiL2d1aWRlL3dlYnVpL2FwaS92ZXJzaW9uaW50ZXJmYWNlXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiTU1STC1VdGlsXCIsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6IFwiR2V0dGluZyBTdGFydGVkXCIsIGxpbms6IFwiL2d1aWRlL21tcmwtdXRpbC9cIiB9LFxuICAgICAgICAgICAgeyB0ZXh0OiBcInJlcG8uanNvblwiLCBsaW5rOiBcIi9ndWlkZS9tbXJsLXV0aWwvcmVwby1qc29uXCIgfSxcbiAgICAgICAgICAgIHsgdGV4dDogXCJ0cmFjay5qc29uXCIsIGxpbms6IFwiL2d1aWRlL21tcmwtdXRpbC90cmFjay1qc29uXCIgfSxcbiAgICAgICAgICAgIHsgdGV4dDogXCJjb25maWcuanNvblwiLCBsaW5rOiBcIi9ndWlkZS9tbXJsLXV0aWwvY29uZmlnLWpzb25cIiB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgdGV4dDogXCJGQVFcIiwgbGluazogXCIvZ3VpZGUvZmFxXCIgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gc2lkZWJhckxlZ2FsKCkge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHRleHQ6IFwiTGVnYWxcIixcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgdGV4dDogXCJQcml2YWN5IFBvbGljeVwiLCBsaW5rOiBcIi9sZWdhbC9wcml2YWN5XCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIlRlcm1zIG9mIFNlcnZpY2VcIiwgbGluazogXCIvbGVnYWwvdGVybXNcIiB9LFxuICAgICAgICB7IHRleHQ6IFwiQ2hhdCBSdWxlc1wiLCBsaW5rOiBcIi9sZWdhbC9jaGF0LXJ1bGVzXCIgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gcmVwb3MoKSB7XG4gIHJldHVybiByZXBvc2l0b3JpZXMubWFwKChyZXBvKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSByZXF1ZXN0KFwiR0VUXCIsIGAke3JlcG8udXJsfWpzb24vbW9kdWxlcy5qc29uYCk7XG4gICAgY29uc3QgcmVwID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXRCb2R5KFwidXRmOFwiKSk7XG4gICAgY29uc3QgbW9kdWxlcyA9IHJlcC5tb2R1bGVzLm1hcCgobW9kdWxlKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0ZXh0OiBtb2R1bGUubmFtZSxcbiAgICAgICAgbGluazogYC9yZXBvc2l0b3J5LyR7cmVwby5pZH0vJHttb2R1bGUuaWR9YCxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGV4dDogcmVwby5uYW1lLFxuICAgICAgbGluazogYC9yZXBvc2l0b3J5LyR7cmVwby5pZH1gLFxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgaXRlbXM6IG1vZHVsZXMsXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNpZGViYXJSZXBvc2l0b3JpZXMoKSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgdGV4dDogXCJSZXBvc2l0b3JpZXNcIixcbiAgICAgIGl0ZW1zOiByZXBvcygpLFxuICAgIH0sXG4gIF07XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXEdpdEh1YlxcXFxNTVJMQXBwLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXGRhdGFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEdpdEh1YlxcXFxNTVJMQXBwLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXGRhdGFcXFxccmVwb3NpdG9yaWVzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9HaXRIdWIvTU1STEFwcC5naXRodWIuaW8vZG9jcy9kYXRhL3JlcG9zaXRvcmllcy50c1wiO2ltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gXCJ5YW1sXCI7XG5cbmV4cG9ydCBjb25zdCBmaWxlTmFtZSA9IGpvaW4oX19kaXJuYW1lLCBcInJlcG9zaXRvcmllcy55YW1sXCIpO1xuXG5leHBvcnQgY29uc3QgcmVwb3NpdG9yaWVzOiBhbnkgPSBwYXJzZShyZWFkRmlsZVN5bmMoZmlsZU5hbWUsIFwidXRmOFwiKSk7XG5leHBvcnQgY29uc3QgcmVwb3NpdG9yaWVzSlNPTnN0cmluZ2lmeTogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoXG4gIHJlcG9zaXRvcmllcyxcbiAgbnVsbCxcbiAgNFxuKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcR2l0SHViXFxcXE1NUkxBcHAuZ2l0aHViLmlvXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEdpdEh1YlxcXFxNTVJMQXBwLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXFxcXHNoYXJlZC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovR2l0SHViL01NUkxBcHAuZ2l0aHViLmlvL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvc2hhcmVkLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBTaXRlQ29uZmlnIH0gZnJvbSBcInZpdGVwcmVzc1wiO1xuaW1wb3J0IFZpdGVZYW1sIGZyb20gXCJAbW9keWZpL3ZpdGUtcGx1Z2luLXlhbWxcIjtcbmltcG9ydCB7IHdyaXRlRmlsZSB9IGZyb20gXCJmcy9wcm9taXNlc1wiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyByZXBvc2l0b3JpZXNKU09Oc3RyaW5naWZ5IH0gZnJvbSBcIi4uLy4uL2RhdGEvcmVwb3NpdG9yaWVzXCI7XG5pbXBvcnQgeyBibGFja2xpc3RKU09Oc3RyaW5naWZ5IH0gZnJvbSBcIi4uLy4uL2RhdGEvYmxhY2tsaXN0XCI7XG5cbmV4cG9ydCBjb25zdCBzaGFyZWQgPSBkZWZpbmVDb25maWcoe1xuICB2aXRlOiB7XG4gICAgcGx1Z2luczogW1ZpdGVZYW1sKCldLFxuICB9LFxuICBtYXJrZG93bjoge1xuICAgIGxpbmVOdW1iZXJzOiB0cnVlLFxuICB9LFxuICByZXdyaXRlczoge1xuICAgIFwiZW4vOnJlc3QqXCI6IFwiOnJlc3QqXCIsXG4gIH0sXG4gIGNsZWFuVXJsczogdHJ1ZSxcbiAgdGl0bGU6IFwiTU1STFwiLFxuICBzaXRlbWFwOiB7XG4gICAgaG9zdG5hbWU6IFwiaHR0cHM6Ly9tbXJsLmRldlwiLFxuICB9LFxuICBoZWFkOiBbXG4gICAgW1xuICAgICAgXCJzY3JpcHRcIixcbiAgICAgIHtcbiAgICAgICAgYXN5bmM6IFwiYXN5bmNcIixcbiAgICAgICAgc3JjOiBcImh0dHBzOi8vcGFnZWFkMi5nb29nbGVzeW5kaWNhdGlvbi5jb20vcGFnZWFkL2pzL2Fkc2J5Z29vZ2xlLmpzP2NsaWVudD1jYS1wdWItNTA0MjcyOTQxNjg3OTAwN1wiLFxuICAgICAgICBjcm9zc29yaWdpbjogXCJhbm9ueW1vdXNcIixcbiAgICAgIH0sXG4gICAgXSxcbiAgXSxcbiAgdHJhbnNmb3JtUGFnZURhdGEocGFnZURhdGEsIGN0eCkge1xuICAgIGlmIChwYWdlRGF0YS5wYXJhbXM/LnRpdGxlKSB7XG4gICAgICBwYWdlRGF0YS50aXRsZSA9IHBhZ2VEYXRhLnBhcmFtcy50aXRsZTtcbiAgICB9XG5cbiAgICBpZiAocGFnZURhdGEucGFyYW1zPy5kZXNjcmlwdGlvbikge1xuICAgICAgcGFnZURhdGEuZGVzY3JpcHRpb24gPSBwYWdlRGF0YS5wYXJhbXMuZGVzY3JpcHRpb247XG4gICAgfVxuICB9LFxuICBidWlsZEVuZDogYXN5bmMgKGNvbmZpZzogU2l0ZUNvbmZpZykgPT4ge1xuICAgIGNvbnN0IHB1YmxpY0FwaSA9IHJlc29sdmUoY29uZmlnLm91dERpciwgXCJhcGlcIik7XG4gICAgY29uc3QgcHVibGljUmVwb0xpc3QgPSByZXNvbHZlKHB1YmxpY0FwaSwgXCJyZXBvc2l0b3JpZXMuanNvblwiKTtcbiAgICBjb25zdCBwdWJsaWNCbGFja0xpc3QgPSByZXNvbHZlKHB1YmxpY0FwaSwgXCJibGFja2xpc3QuanNvblwiKTtcblxuICAgIGF3YWl0IHdyaXRlRmlsZShwdWJsaWNSZXBvTGlzdCwgcmVwb3NpdG9yaWVzSlNPTnN0cmluZ2lmeSk7XG4gICAgYXdhaXQgd3JpdGVGaWxlKHB1YmxpY0JsYWNrTGlzdCwgYmxhY2tsaXN0SlNPTnN0cmluZ2lmeSk7XG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcR2l0SHViXFxcXE1NUkxBcHAuZ2l0aHViLmlvXFxcXGRvY3NcXFxcZGF0YVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcR2l0SHViXFxcXE1NUkxBcHAuZ2l0aHViLmlvXFxcXGRvY3NcXFxcZGF0YVxcXFxibGFja2xpc3QudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0dpdEh1Yi9NTVJMQXBwLmdpdGh1Yi5pby9kb2NzL2RhdGEvYmxhY2tsaXN0LnRzXCI7aW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSBcInlhbWxcIjtcblxuZXhwb3J0IGNvbnN0IGZpbGVOYW1lID0gam9pbihfX2Rpcm5hbWUsIFwiYmxhY2tsaXN0LnlhbWxcIik7XG5cbmV4cG9ydCBjb25zdCBibGFja2xpc3Q6IGFueSA9IHBhcnNlKHJlYWRGaWxlU3luYyhmaWxlTmFtZSwgXCJ1dGY4XCIpKTtcbmV4cG9ydCBjb25zdCBibGFja2xpc3RKU09Oc3RyaW5naWZ5OiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShcbiAgYmxhY2tsaXN0LFxuICBudWxsLFxuICA0XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3VSxTQUFTLGdCQUFBQSxxQkFBb0I7OztBQ0FuQyxTQUFTLHFCQUFxQjtBQUNoVyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGFBQWE7OztBQ0Z5UixTQUFTLG9CQUFvQjtBQUMxVSxTQUFTLFlBQVk7QUFDckIsU0FBUyxhQUFhO0FBRnRCLElBQU0sbUNBQW1DO0FBSWxDLElBQU0sV0FBVyxLQUFLLGtDQUFXLG1CQUFtQjtBQUVwRCxJQUFNLGVBQW9CLE1BQU0sYUFBYSxVQUFVLE1BQU0sQ0FBQztBQUM5RCxJQUFNLDRCQUFvQyxLQUFLO0FBQUEsRUFDcEQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGOzs7QURYOE0sSUFBTSwyQ0FBMkM7QUFLL1AsSUFBTUMsV0FBVSxjQUFjLHdDQUFlO0FBQzdDLElBQU0sTUFBTUEsU0FBUSx3QkFBd0I7QUFFNUMsSUFBTyxhQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixhQUFhO0FBQUEsRUFFYixhQUFhO0FBQUEsSUFDWCxLQUFLLElBQUk7QUFBQSxJQUVULGlCQUFpQjtBQUFBLElBRWpCLFNBQVM7QUFBQSxNQUNQLFdBQVcsYUFBYTtBQUFBLE1BQ3hCLGdCQUFnQixvQkFBb0I7QUFBQSxNQUNwQyxXQUFXLGFBQWE7QUFBQSxJQUMxQjtBQUFBLElBRUEsYUFBYTtBQUFBLE1BQ1gsRUFBRSxNQUFNLFVBQVUsTUFBTSxrQ0FBa0M7QUFBQSxNQUMxRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsSUFFQSxRQUFRO0FB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LFlBQVksUUFBUSxPQUFPLFFBQVEsS0FBSztBQUM5QyxVQUFNLGlCQUFpQixRQUFRLFdBQVcsbUJBQW1CO0FBQzdELFVBQU0sa0JBQWtCLFFBQVEsV0FBVyxnQkFBZ0I7QUFFM0QsVUFBTSxVQUFVLGdCQUFnQix5QkFBeUI7QUFDekQsVUFBTSxVQUFVLGlCQUFpQixzQkFBc0I7QUFBQSxFQUN6RDtBQUNGLENBQUM7OztBSDdDRCxJQUFPLGlCQUFRQyxjQUFhO0FBQUEsRUFDMUIsR0FBRztBQUFBLEVBQ0gsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsTUFBTSxXQUFHO0FBQUEsTUFDVCxhQUFhLFdBQUc7QUFBQSxNQUNoQixhQUFhLFdBQUc7QUFBQSxJQUNsQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJkZWZpbmVDb25maWciLCAicmVxdWlyZSIsICJkZWZpbmVDb25maWciLCAicmVhZEZpbGVTeW5jIiwgImpvaW4iLCAicGFyc2UiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAiZmlsZU5hbWUiLCAiam9pbiIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJwYXJzZSIsICJyZWFkRmlsZVN5bmMiLCAiZGVmaW5lQ29uZmlnIiwgImRlZmluZUNvbmZpZyJdCn0K
