import Teek from "vitepress-theme-teek";
import "vitepress-theme-teek/index.css";
import "./custom.css";

export default {
  ...Teek,
  enhanceApp: async (ctx) => {
    await Teek.enhanceApp?.(ctx);
    if (typeof window === "undefined") return;

    // Teek's category/tag cards update query parameters with history.pushState.
    // HomePost watches only route.path, so notify its exposed updater when the
    // query changes without forcing a navigation or changing the URL shape.
    const notify = () => {
      window.dispatchEvent(new Event("teek:query-change"));
    };
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    window.history.pushState = function (...args) {
      const before = window.location.href;
      const result = originalPushState.apply(this, args);
      if (window.location.href !== before) notify();
      return result;
    };
    window.history.replaceState = function (...args) {
      const before = window.location.href;
      const result = originalReplaceState.apply(this, args);
      if (window.location.href !== before) notify();
      return result;
    };

    // VitePress exposes the reactive route through the app context. Replacing
    // the current route with its current URL makes query changes observable to
    // Teek without a full page reload.
    window.addEventListener("teek:query-change", () => {
      const router = ctx.router;
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (router?.go) router.go(current);
    });
  },
};
