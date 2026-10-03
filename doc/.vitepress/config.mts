import { defineConfig } from "vitepress";
import { teekConfig } from "./teek-config.mts";

export default defineConfig({
  extends: teekConfig,
  base: "/",
  lang: "zh-CN",
  title: "⭐未拾获的星光⭐",
  description: "慢品人间烟火色，闲观万事岁月长",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: "/logo.svg",
    siteTitle: "未拾获的星光",
    nav: [
      { text: "首页", link: "/" },
      { text: "分享", link: "/share/?category=%E5%88%86%E4%BA%AB" },
      { text: "笔记", link: "/notes/?category=%E7%AC%94%E8%AE%B0" },
      { text: "报告", link: "/reports/?category=%E6%8A%A5%E5%91%8A" },
      { text: "兴趣", link: "/interests/?category=%E5%85%B4%E8%B6%A3" },
    ],
    sidebar: false,
    outline: "deep",
    search: { provider: "local" },
    socialLinks: [
      { icon: "github", link: "https://github.com/Zimeng-Luo" },
    ],
    footer: {
      message: "慢品人间烟火色，闲观万事岁月长",
      copyright: "Copyright © 2026 未拾获的星光",
    },
  },
});
