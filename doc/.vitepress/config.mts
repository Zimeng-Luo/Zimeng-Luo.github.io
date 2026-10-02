import { defineConfig } from "vitepress";
import { teekConfig } from "./teek-config.mts";

export default defineConfig({
  extends: teekConfig,
  lang: "zh-CN",
  title: "未拾获的星光",
  description: "慢品人间烟火色，闲观万事岁月长",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: "/logo.svg",
    siteTitle: "未拾获的星光",
    nav: [
      { text: "首页", link: "/" },
      { text: "文章", link: "/markdown-examples" },
      { text: "关于", link: "/api-examples" },
    ],
    sidebar: {
      "/": [
        {
          text: "开始阅读",
          items: [
            { text: "Markdown 示例", link: "/markdown-examples" },
            { text: "API 示例", link: "/api-examples" },
          ],
        },
      ],
    },
    outline: "deep",
    search: { provider: "local" },
    footer: {
      message: "慢品人间烟火色，闲观万事岁月长",
      copyright: "Copyright © 2026 未拾获的星光",
    },
  },
});
