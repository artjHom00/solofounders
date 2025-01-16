<script lang="ts" setup>
import type { IBaseArticle } from '../../types/article/IBaseArticle'

const MS_IN_DAY = 24 * 60 * 60 * 1000
type props = IBaseArticle

const definedProps = defineProps<props>()

const delta = Date.now() - new Date(definedProps.createdAt).getTime()

const formattedPoints = computed(() => {
  const points = definedProps.points

  if (points > 1000) {
    return (points / 1000).toFixed(0) + 'K+'
  }

  return points
})
</script>

<template>
  <NuxtLink :to="`/articles/${slug}`" class="flex items-center gap-4 hover:underline">
    <div>
      <i class="fa-solid fa-circle text-primary animate-pulse" />
    </div>
    <div>
      <p class="font-bold text-3xl w-20 overflow-hidden text-left">
        {{ formattedPoints }}
      </p>
    </div>
    <div>
      <h3 class="tracking-tight font-semibold text-lg leading-none">
        {{ name }}
      </h3>
      <span class="text-sm opacity-50">by <a href="#">@{{ author?.handle }}</a> |
        <span>
          <NuxtTime :datetime="createdAt" :relative="delta < MS_IN_DAY && delta > 0" />
        </span> |
        <span>{{ views }} views</span>
      </span>
    </div>
  </NuxtLink>
</template>

<style></style>
