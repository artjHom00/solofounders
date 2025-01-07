<script lang="ts" setup>

import Button from '../../components/ui/Button.vue';
import type { IArticle } from '../../types/article/IArticle';

const route = useRoute()

const slug = route.params.slug;

const { data: article } = useFetch<IArticle>('/api/articles?slug=' + slug);

</script>

<template>
  <main>
    <div class="article-content container max-w-screen-sm mx-auto mt-8 dark:text-light">

      <Button variant="secondary" :onClick="() => navigateTo('/')" class="!text-dark dark:!text-light">
        <i class="fa-solid fa-chevron-left text-xs"></i> <span class="tracking-tight text-sm"></span>
      </Button>

      <div class="mt-8" v-html="$md.render(article.content)" v-if="article"></div>
      <div>
        <hr class="!mb-5" width="60" />
        <div class="mb-5 flex gap-4">
          <Button :onClick="() => null" variant="secondary"><i class="fa-regular fa-thumbs-up"></i></Button>
          <Button :onClick="() => null" variant="secondary"><i class="fa-regular fa-comment"></i></Button>
          <Button :onClick="() => null" variant="secondary"><i class="fa-solid fa-retweet"></i></Button>
        </div>
        <span class="text-sm tracking-tighter">Liked the story? <br />
          <a href="https://x.com/solofounders_" target="_blank" class="!underline" style="color: initial">Follow us on
            X</a> for more content!</span>
      </div>
    </div>
  </main>
</template>

<style>
@import '/assets/css/article.css';
</style>