import Teek from "vitepress-theme-teek";
import "vitepress-theme-teek/index.css";
import "./custom.css";
import CategoryPostList from "./CategoryPostList.vue";

export default {
  ...Teek,
  enhanceApp: async (ctx) => {
    await Teek.enhanceApp?.(ctx);
    ctx.app.component("CategoryPostList", CategoryPostList);
  },
};
