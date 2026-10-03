import { defineTeekConfig } from "vitepress-theme-teek/config";

export const teekConfig = defineTeekConfig({
  teekHome: true,
  vpHome: false,
  bodyBgImg: {},
  author: {
    name: "未拾获的星光",
  },
  banner: {
    enabled: true,
    name: "未拾获的星光",
    bgStyle: "fullImg",
    imgSrc: ["/blog/bg1.webp", "/blog/bg2.webp", "/blog/bg3.webp"],
  },
  pageStyle: "segment",
  themeEnhance: {
    layoutSwitch: {
      defaultMode: "original",
    },
  },
  footerInfo: {
    copyright: {
      show: true,
      createYear: 2026,
      suffix: "未拾获的星光",
    },
  },
});
