<script lang="ts" setup>
import { MdEditor, config, type Footers, type ToolbarNames } from 'md-editor-v3';

import 'md-editor-v3/lib/style.css';
import ToastPlugin, { useToast } from 'vue-toast-notification';


const initialHeadingPlaceholder = "Heading, e.g. 🚀 How we've scaled our AI SaaS from $0 to $50k MRR in 4 months!"
const initialEditorText = `## 👋 Welcome to Solofounders Editor

We're excited to hear your indie hacking journey! Share your story and inspire others in the community. Here's couple tips to help you structure your post:

💡 Tips for Writing:

- Be authentic and honest. Share the highs _and_ the lows.
- Include visuals like screenshots, charts, or code snippets if possible.
- Keep it concise, but detailed enough to engage readers.

---

When you're ready, hit "Publish" and share your story with the SoloFounders community. 🎉
`

const colorMode = useColorMode()
const toast = useToast()

const heading = ref('')
const content = ref(initialEditorText)

const editorId = 'editor'

const toolbarExclude: ToolbarNames[] = ['unorderedList', 'table', 'catalog', 'fullscreen', 'htmlPreview', 'github', 'katex', 'previewOnly', 'pageFullscreen', 'save', 'mermaid', 'task', 'orderedList', 'sub', 'sup',]
const footers: Footers[] = ['markdownTotal'];

const submitHandle = async () => {
    try {

        const url = await $fetch(`/api/articles`, {
            method: 'POST',
            body: {
                name: heading.value,
                content: content.value,
            }
        })
        
        toast.success('Story successfully submitted!')
        navigateTo('/articles/' + url)
    } catch (e) {
        toast.error('Error while submitting your story!')
    }
}
</script>

<template>
    <div>
        <ClientOnly>
            <input type="text" v-model="heading" :placeholder="initialHeadingPlaceholder"
                class="input input-bordered bg-[#f2f2f2] dark:placeholder:text-[#999] font-bold dark:bg-[#262626] dark:focus:bg-[#262626] w-full" />
            <MdEditor class="article-content rounded-lg min-h-screen mt-5" :id="editorId" :footers="footers"
                :show-toolbar-name="true" v-model="content" language="en_US" :toolbars-exclude="toolbarExclude"
                :theme="colorMode.value === 'dark' ? 'dark' : 'light'" noImgZoomIn />
            <button class="mt-4 block mx-auto btn dark:btn-secondary" @click="submitHandle">Submit the story!</button>
        </ClientOnly>
    </div>
</template>



<style>
/* @import '/assets/css/article.css'; */

svg.md-editor-icon {
  width: 27px;
  height: 27px;
}
.md-editor { 
  --md-bk-color: #f2f2f2;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}
.md-editor-dark, .md-editor-modal-container[data-theme='dark'] {
  --md-bk-color: #262626;
}
.md-editor-toolbar-wrapper {
  padding: 12px 16px;
}
.md-editor-footer {
  padding: 12px 16px;
  height: initial;
}

.md-editor-menu {
    border-radius: 8px;
    padding: 4px;
}
.md-editor-menu > li {
    border-radius: 4px;
    padding: 8px 24px;
}
</style>