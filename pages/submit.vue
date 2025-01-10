<script setup lang="ts">
import { ClientOnly } from '#components'

import { MdEditor, config } from 'md-editor-v3';

import 'md-editor-v3/lib/style.css';


const initialContent = `### 👋 welcome to solofounders editor; 
we're waiting for your story!`

const text = ref(initialContent);
const editorId = 'editor'

const colorMode = useColorMode()
</script>

<template>
  <h2 class="text-center font-bold text-2xl">
    solofounders story submission
  </h2>
  <p class="text-center ">
    before submission, make sure to read <a class="hover:underline" href="#">our rules of writing</a>;
  </p>
  <div class="article-content mx-auto container max-w-screen-lg mt-8">
    <ClientOnly>
      <MdEditor class="rounded-lg" :id="editorId" v-model="text" language="en_US" :theme="colorMode.value === 'dark' ? 'dark' : 'light'" :tab-width="1000" />
      <button class="mt-4 block mx-auto btn dark:btn-secondary">Submit the story!</button>
    </ClientOnly>
  </div>
</template>

<style>
svg.md-editor-icon {
  width: 24px;
  height: 24px;
}
.md-editor { 
  --md-bk-color: #FCFCFC;
}
.md-editor-dark, .md-editor-modal-container[data-theme='dark'] {
  --md-bk-color: #141414
}
</style>
