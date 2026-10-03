import Teek from "vitepress-theme-teek";
import "vitepress-theme-teek/index.css";
import "./custom.css";

export default {
  ...Teek,
  enhanceApp: async (ctx) => {
    await Teek.enhanceApp?.(ctx);
    if (typeof window === "undefined") return;

    let currentSearch = window.location.search;
    let switching = false;
    const refreshPostList = () => {
      if (currentSearch === window.location.search || switching) return;
      currentSearch = window.location.search;
      const list = document.querySelector(".tk-post > ul");
      if (!list) return;
      switching = true;
      list.classList.add("tk-post-query-leave");
      window.setTimeout(() => {
        window.dispatchEvent(new Event("teek-query-change"));
      }, 260);
    };

    const originalPushState = window.history.pushState.bind(window.history);
    window.history.pushState = (...args) => {
      originalPushState(...args);
      refreshPostList();
    };
    window.addEventListener("popstate", refreshPostList);
    window.addEventListener("teek-query-change", () => {
      const list = document.querySelector(".tk-post > ul");
      if (!list) return;
      list.classList.remove("tk-post-query-leave");
      list.classList.add("tk-post-query-enter");
      window.setTimeout(() => {
        list.classList.remove("tk-post-query-enter");
        switching = false;
      }, 260);
    });
  },
};
