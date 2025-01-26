<script lang="ts" setup>
import ArticlesView from '../components/Article/ArticlesView.vue'

let searchQuery: Ref<string | undefined> = ref('');

const route = useRoute()
searchQuery.value = Array.isArray(route.query.q) ? route.query.q[0]?.toString() : route.query.q || undefined

onBeforeUpdate(() => {
    searchQuery.value = Array.isArray(route.query.q) ? route.query.q[0]?.toString() : route.query.q || undefined
})
</script>

<template>
    <div class="mx-auto">
        <div class="mt-8" v-if="searchQuery != null">
            <h1 class="mt-8 text-3xl font-black">
                Search results for "{{ searchQuery }}"
            </h1>
            <h2 class="mt-2 opacity-75">
                Here's what we got by your query!
            </h2>
            <ArticlesView :default-take="10" :search-query="searchQuery" :key="searchQuery"/>
        </div>
        <div v-else>
            <h1 class="mt-8 text-3xl font-black">
                :(
            </h1>
            <h2 class="mt-8 opacity-75">
                You haven't provided the search query to proceed! <br />
                Go <NuxtLink to="/" class="underline">back home</NuxtLink> and try again
            </h2>
        </div>
    </div>
</template>

<style>
/* Add styles specific to the parent component if necessary */
</style>
