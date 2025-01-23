<script lang="ts" setup>
import { TimeConstants } from '../../utils/TimeConstants'
import type { IBaseArticle } from '../../types/article/IBaseArticle'

type props = IBaseArticle

const definedProps = defineProps<props>()
const notificationsStore = useNotificationsStore()

const delta = timePassed(definedProps.createdAt)

const formattedPoints = computed(() => {
  const points = definedProps.points

  if (points > 1000) {
    return (points / 1000).toFixed(0) + 'K+'
  }

  return points
})
</script>

<template>
  <NuxtLink :to="`/articles/${slug}`" class="flex items-center gap-4 hover:underline transition-all duration-200">
    <div
    class="transition-all duration-500"
      :class="notificationsStore.currentNotifications.find(notification => notification.id === id) ? 'opacity-100' : 'opacity-0'">
      <i class="fa-solid fa-circle text-[7px] text-primary" />
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
          <NuxtTime :datetime="createdAt" :relative="delta < TimeConstants.MS_IN_DAY && delta > 0" />
        </span> |
        <span>{{ views }} views</span>
      </span>
    </div>
  </NuxtLink>
</template>

<style>
</style>
