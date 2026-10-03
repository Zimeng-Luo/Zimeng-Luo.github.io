import Teek from "vitepress-theme-teek";
import "vitepress-theme-teek/index.css";
import "./custom.css";

export default {
  ...Teek,
  enhanceApp: async (ctx) => {
    await Teek.enhanceApp?.(ctx);
    if (typeof window === "undefined") return;

    let currentSearch = window.location.search;
    const refreshPostList = () => {
      if (currentSearch === window.location.search) return;
      currentSearch = window.location.search;
      window.dispatchEvent(new PopStateEvent("popstate"));
    };

    const originalPushState = window.history.pushState.bind(window.history);
    window.history.pushState = (...args) => {
      originalPushState(...args);
      refreshPostList();
    };
    window.addEventListener("popstate", refreshPostList);
  },
};
