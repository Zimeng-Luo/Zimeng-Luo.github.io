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
      { text: "分享", link: "/share/" },
      { text: "笔记", link: "/notes/" },
      { text: "报告", link: "/reports/" },
      { text: "兴趣", link: "/interests/" },
      { text: "归档", link: "/archives/" },
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
