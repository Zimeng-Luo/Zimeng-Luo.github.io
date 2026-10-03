import Teek from "vitepress-theme-teek";
import "vitepress-theme-teek/index.css";
import "./custom.css";

export default {
  ...Teek,
  enhanceApp: async (ctx) => {
    await Teek.enhanceApp?.(ctx);
    if (typeof window === "undefined") return;

    let currentUrl = window.location.href;
    const isFilterPage = () =>
      window.location.pathname === "/categories/" ||
      window.location.pathname === "/tags/";
    const reloadAfterFilterChange = () => {
      const nextUrl = window.location.href;
      if (nextUrl === currentUrl || !isFilterPage()) return;
      currentUrl = nextUrl;
      window.location.reload();
    };

    const originalPushState = window.history.pushState.bind(window.history);
    window.history.pushState = (...args) => {
      originalPushState(...args);
      reloadAfterFilterChange();
    };
    window.addEventListener("popstate", reloadAfterFilterChange);
  },
};
