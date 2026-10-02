import { defineTeekConfig } from "vitepress-theme-teek/config";

export const teekConfig = defineTeekConfig({
  author: {
    name: "未拾获的星光",
  },
  banner: {
    enabled: true,
    name: "未拾获的星光",
    bgStyle: "pure",
    pureBgColor: "#f5f7fa",
    textColor: "#303133",
    description: "慢品人间烟火色，闲观万事岁月长",
  },
  pageStyle: "default",
  themeEnhance: {
    layoutSwitch: true,
    spotlight: true,
  },
  footerInfo: {
    copyright: {
      show: true,
      createYear: 2026,
      suffix: "未拾获的星光",
    },
  },
});
