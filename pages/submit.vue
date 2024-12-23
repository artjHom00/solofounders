<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { ClientOnly } from '#components'
import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
import AutoJoiner from 'tiptap-extension-auto-joiner';

const content = "👋 welcome to solofounders editor; <br/> we're waiting for your story!" 

const editor = ref(null)

onMounted(() => {
    editor.value = new Editor({
        content: content,
        autofocus: true,
        extensions: [StarterKit, GlobalDragHandle, AutoJoiner],
    })
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<template>
    <h2 class="text-center font-bold text-2xl">solofounders story submission</h2>
    <p class="text-center ">before submission, make sure to read <a class="hover:underline" href="#">our rules of writing</a>;</p>
    <div class="article-content container mx-auto max-w-screen-md mt-8">
        <ClientOnly >
            <EditorContent class="p-3 border" :editor="editor"/>
            <button class="mt-4 block mx-auto border px-6 py-1 text-center font-bold tracking-tight text-sm cursor-pointer">
                Submit
            </button>
        </ClientOnly>
    </div>
</template>

<style>
@import '/assets/css/article.css';
.tiptap {
    outline: none;
}
</style>
