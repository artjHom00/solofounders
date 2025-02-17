<script lang="ts" setup>
import { MdEditor, config, type Footers, type ToolbarNames } from 'md-editor-v3'

import 'md-editor-v3/lib/style.css'
import { useToast } from 'vue-toastification'
import ArticleSubmitErrorToast from './Toasts/articles/ArticleSubmitErrorToast.vue'
import ArticleSubmitSuccessToast from './Toasts/articles/ArticleSubmitSuccessToast.vue'
import FileUploadSuccessToast from './Toasts/files/FileUploadSuccessToast.vue'
import FileUploadErrorToast from './Toasts/files/FileUploadErrorToast.vue'
import FileUploadProgressToast from './Toasts/files/FileUploadProgressToast.vue'

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

const isLoading = ref(false)
const heading = ref('')
const content = ref(initialEditorText)

const editorId = 'editor'

const toolbarExclude: ToolbarNames[] = ['underline', 'unorderedList', 'table', 'catalog', 'fullscreen', 'htmlPreview', 'github', 'katex', 'previewOnly', 'pageFullscreen', 'save', 'mermaid', 'task', 'orderedList', 'sub', 'sup']
const footers: Footers[] = ['markdownTotal']

const submitHandle = async () => {
  try {
    isLoading.value = true
    
    if(content.value.length <= 150) {
      isLoading.value = false
      toast.error('The article should be at least 150 characters long')
      return
    }

    if(heading.value === '') {
      isLoading.value = false
      toast.error('Fill in the heading and try again')
      return
    }
    
    const isValid = /^[A-Za-z0-9\s\-.,!?$£€%¥"'`]+$/.test(heading.value)
    if(isValid !== true) {
      isLoading.value = false
      toast.error('Heading can only contain latin characters, -.,!?$£€%¥')
      return
    }
    
    const url = await $fetch<string>('/api/articles', {
      method: 'POST',
      body: {
        name: heading.value,
        content: content.value
      }
    })

    toast.success(ArticleSubmitSuccessToast)
    navigateTo('/articles/' + url)
  } catch (e) {
    isLoading.value = false
    toast.error(ArticleSubmitErrorToast)
  }
}

const generateFilesFormData = (files: File[]): FormData => {
  const formData = new FormData();

  for(const file of files) {
    formData.append('file', file)
  }

  return formData
}

const handleImageUpload = async (files: File[], callback: (urls: string[]) => void) => {
  toast.info(FileUploadProgressToast)
  try {
    const formData = generateFilesFormData(files)
    
    const urls = await $fetch<string[]>('/api/files/upload', {
      method: 'POST',
      body: formData
    })
  
    toast.success(FileUploadSuccessToast)
  
    return callback(urls)
  } catch (e) {
    toast.error(FileUploadErrorToast)
  }
}
</script>

<template>
  <div class="container mx-auto">
    <ClientOnly>
      <input
        v-model="heading"
        type="text"
        :placeholder="initialHeadingPlaceholder"
        class="input font-semibold border-[#dddddd] dark:input-bordered bg-light placeholder:text-[#3f4a54a2] dark:placeholder:text-[#999] dark:bg-dark-secondary dark:focus:bg-dark-secondary w-full"
      >
      <MdEditor
        :id="editorId"
        v-model="content"
        class="article-content rounded-lg min-h-screen mt-5"
        :footers="footers"
        language="en_US"
        :toolbars-exclude="toolbarExclude"
        :theme="colorMode.value === 'dark' ? 'dark' : 'light'"
        no-img-zoom-in
        @on-upload-img="handleImageUpload"
      />
      <button class="mt-4 block mx-auto btn dark:btn-secondary" @click="submitHandle" :disabled="isLoading">
        <span v-if="!isLoading">Submit the story!</span>
        <span v-else>Submitting...</span>
      </button>
    </ClientOnly>
  </div>
</template>

<style>
/* @import '/assets/css/article.css'; */

body #editor-toolbar-wrapper svg.md-editor-icon, body .md-editor-modal svg.md-editor-icon {
    width: 27px;
    height: 27px;
}
body .md-editor-modal-func > * {
  margin: 0 4px;
}
body .md-editor-modal {
  height: 450px !important;
  border-radius: 0.5rem;
}
body .md-editor-modal .md-editor-modal-body {
  height: calc(100% - 70px)
}
body .md-editor-modal-header {
  padding: 16px 24px;
}
body .md-editor-modal, body .md-editor-modal-header {
  color: white;
}
body .md-editor-modal .md-editor-btn {
  color: #262626;
  font-weight: 600;
  border-radius: 0.5rem;
  background: #f2f2f2;
  width: 150px;
  height: 50px;
}
.md-editor-modal .md-editor-modal-func {
  top: 13px;
  right:13px;
}
.md-editor-modal .md-editor-modal-adjust {
  display: none !important;
}
.md-editor-preview a {
  text-decoration: underline !important;
}
body .md-editor {
    --md-bk-color: #f2f2f2;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}
body .md-editor * {
    color: #262626 !important;
}

body .md-editor-dark, body .md-editor-modal-container[data-theme='dark'] {
    --md-bk-color: #262626 !important;
}
body .md-editor-dark * {
    color: #f2f2f2 !important;
}

body .md-editor-toolbar-wrapper {
    padding: 12px 16px;
}

body .md-editor-footer {
    padding: 12px 16px;
    height: initial;
}

body .md-editor-menu {
    border-radius: 8px;
    padding: 4px;
}

body .md-editor-menu>li {
    border-radius: 4px;
    padding: 8px 24px;
}

body .md-editor-code-head {
    display: none !important;
}

body .md-editor-code-block {
    font-family: 'Fira Code', monospace !important;
    padding: 2px 4px !important;
    border-radius: 4px !important;
}
body .md-editor-code-block * {
    font-family: 'Fira Code', monospace !important;
}
body .md-editor-scrn pre code {
   padding-left: 1em !important;
   background-color: transparent !important;
}
body .md-editor-code code > span:last-child {
    display: none !important;
}
body div.default-theme .md-editor-code pre code {
    background-color: oklch(var(--s) / 0.75);
    box-shadow: none;
}
</style>
