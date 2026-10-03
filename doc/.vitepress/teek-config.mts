import { readdirSync } from "node:fs";
import { join } from "node:path";
import { defineTeekConfig } from "vitepress-theme-teek/config";

const blogImageDir = join(process.cwd(), "doc/public/blog");
const blogImages = readdirSync(blogImageDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.(webp|png|jpe?g)$/i.test(entry.name))
  .map((entry) => `/blog/${entry.name}`)
  .sort();

export const teekConfig = defineTeekConfig({
  teekHome: true,
  vpHome: false,
  bodyBgImg: {},
  author: {
    name: "\u7F57\u6893\u840C",
    avatar: "https://github.com/Zimeng-Luo.png",
    slogan: "\u6162\u54C1\u4EBA\u95F4\u70DF\u706B\u8272\uFF0C\u95F2\u89C2\u4E07\u4E8B\u5C81\u6708\u957F",
    shape: "circle",
  },
  blogger: {
    name: "\u7F57\u6893\u840C",
    avatar: "https://github.com/Zimeng-Luo.png",
    slogan: "\u6162\u54C1\u4EBA\u95F4\u70DF\u706B\u8272\uFF0C\u95F2\u89C2\u4E07\u4E8B\u5C81\u6708\u957F",
    shape: "circle",
  },
  banner: {
    enabled: true,
    name: "\u672A\u62FE\u83B7\u7684\u661F\u5149",
    bgStyle: "fullImg",
    imgSrc: blogImages,
    imgInterval: 30000,
    imgShuffle: true,
    imgWaves: true,
  },
  pageStyle: "default",
  themeEnhance: {
    layoutSwitch: {
      defaultMode: "original",
    },
  },
  post: {
    postStyle: "card",
    showMore: true,
    showCapture: true,
    coverImgMode: "full",
    defaultCoverImg: blogImages,
  },
  articleBanner: {
    enabled: true,
    showCategory: true,
    showTag: true,
    defaultCoverImg: "/blog/bg1.webp",
  },
  articleAnalyze: {
    dateFormat: "yyyy-MM-dd",
    showAuthor: false,
    showCreateDate: true,
    showUpdateDate: true,
    showCategory: true,
    showTag: true,
    showInfo: true,
    imageViewer: {
      enabled: false,
    },
  },
  articleShare: {
    enabled: true,
  },
  breadcrumb: {
    enabled: false,
  },
  sidebarTrigger: false,
  backTop: {
    enabled: true,
    content: "progress",
  },
  codeBlock: {
    enabled: true,
    collapseHeight: 700,
  },
  viewTransition: {
    enabled: true,
  },
  docAnalysis: {
    enabled: true,
    wordCount: true,
    readingTime: false,
  },
  siteAnalytics: [
    {
      provider: "baidu",
      options: {
        id: "90d9d1569d17cd9bf1ad8cf453bc021c",
      },
    },
  ],
  footerInfo: {
    theme: {
      show: true,
    },
    copyright: {
      show: true,
      createYear: 2026,
      suffix: "\u6240\u6709\u5185\u5BB9\u4EC5\u4F9B\u5B66\u4E60\uFF0C\u5982\u6709\u4FB5\u6743\uFF0C\u8BF7\u8054\u7CFB\u5220\u9664",
    },
  },
});
