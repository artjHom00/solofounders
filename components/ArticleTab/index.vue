<script lang="ts" setup>
import type { articleTabComponentProps } from './props.js'

const MS_IN_DAY = 24 * 60 * 60 * 1000

const props = defineProps<articleTabComponentProps>()

const delta = Date.now() - new Date(props.date).getTime()
</script>

<template>
    <NuxtLink :to="url" class="flex items-center gap-4 hover:underline">
        <div>
            <p class="font-bold text-2xl w-12 overflow-hidden">{{ points }}</p>
        </div>
        <div>
            <h3 class="tracking-tight font-semibold text-lg leading-none">{{ name }}</h3>
            <span class="text-sm opacity-50">by <a href="#">{{ author }}</a> |
                <span>
                    <NuxtTime :datetime="date" :relative="delta < MS_IN_DAY && delta > 0" />
                </span> | 
                <span>{{ views }} views</span>
            </span>
        </div>
    </NuxtLink>

</template>

<style></style>