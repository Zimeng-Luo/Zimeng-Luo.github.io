import Teek from "vitepress-theme-teek";
import "vitepress-theme-teek/index.css";
import "./custom.css";

export default {
  ...Teek,
  enhanceApp: async (ctx) => {
    await Teek.enhanceApp?.(ctx);
    if (typeof window === "undefined") return;

    const isFilterPage = () =>
      window.location.pathname === "/categories/" ||
      window.location.pathname === "/tags/";
    let lastUrl = window.location.href;
    let reloadQueued = false;
    const reloadWhenUrlChanges = () => {
      if (!isFilterPage() || reloadQueued || window.location.href === lastUrl) return;
      lastUrl = window.location.href;
      reloadQueued = true;
      window.setTimeout(() => window.location.reload(), 0);
    };
    const originalPushState = window.history.pushState.bind(window.history);
    window.history.pushState = (...args) => {
      originalPushState(...args);
      reloadWhenUrlChanges();
    };
    window.addEventListener("popstate", reloadWhenUrlChanges);

  },
};
