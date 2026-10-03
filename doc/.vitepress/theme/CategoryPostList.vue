<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import { usePosts, TkHomePostItemList } from "vitepress-theme-teek";

const { frontmatter } = useData();
const posts = usePosts();
const category = computed(() => String(frontmatter.value.sectionCategory || ""));
const items = computed(() => posts.value.sortPostsByDateAndSticky.filter((post) => {
  if (post.frontmatter.article === false) return false;
  const categories = post.frontmatter.categories || [];
  return categories.includes(category.value);
}));
</script>

<template>
  <section class="section-post-list" aria-label="文章列表">
    <ul v-if="items.length" class="tk-post-list">
      <li v-for="post in items" :key="post.url" class="tk-post-list__item">
        <a :href="withBase(post.url)" class="tk-post-list__link">
          <TkHomePostItemList :post="post" cover-img-mode="small" />
        </a>
      </li>
    </ul>
    <p v-else class="section-post-list__empty">暂无文章</p>
  </section>
</template>
