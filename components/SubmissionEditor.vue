<script setup lang="ts">

import { MdEditor, config, type Footers, type ToolbarNames } from 'md-editor-v3';

import 'md-editor-v3/lib/style.css';

type props = {
    initialContent?: string,
    theme: 'light' | 'dark'
}

const definedProps = defineProps<props>()

const text = ref(definedProps.initialContent);
const editorId = 'editor'

const toolbarExclude: ToolbarNames[] = ['unorderedList', 'table', 'catalog', 'fullscreen', 'htmlPreview', 'github', 'katex', 'previewOnly', 'pageFullscreen', 'save', 'mermaid', 'task', 'orderedList', 'sub', 'sup', ]
const footers: Footers[] = ['markdownTotal'];
</script>

<template>
    <div>
        <MdEditor class="article-content rounded-lg min-h-screen" :id="editorId" :footers="footers" :show-toolbar-name="true" v-model="text" language="en_US" :toolbars-exclude="toolbarExclude" :theme="theme"  noImgZoomIn />
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