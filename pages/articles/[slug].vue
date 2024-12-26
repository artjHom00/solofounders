<script lang="ts" setup>

import type { IArticle } from '../../types/article/IArticle';

const route = useRoute()

const slug = route.params.slug;

const { data: article } = useFetch<IArticle>('/api/articles?slug=' + slug);

</script>

<template>
  <main>
    <div class="article-content container max-w-screen-sm mx-auto mt-8 dark:text-light">
      <NuxtLink to="/" class="!text-dark dark:!text-light">
        < Go Home </NuxtLink>

          <div class="mt-8" v-html="$md.render(article.content)" v-if="article"></div>
          <div>
            ----
            <br />
            Add a footer here
          </div>
    </div>
  </main>
</template>

<style>
@import '/assets/css/article.css';
</style>