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
    document.addEventListener("click", (event) => {
      if (!isFilterPage()) return;
      const target = event.target as HTMLElement | null;
      const item = target?.closest(".tk-category__list a, .tk-tag__list a");
      if (!item) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const current = new URL(window.location.href);
      const name = item.textContent?.trim().replace(/\s+/g, " ") || "";
      const key = item.closest(".tk-category__list") ? "category" : "tag";
      current.searchParams.delete("pageNum");
      current.searchParams.set(key, name);
      window.location.href = current.toString();
    }, true);
  },
};
