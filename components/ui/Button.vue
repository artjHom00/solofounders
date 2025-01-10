<script lang="ts" setup>
type props = {
    variant?: 'primary' | 'secondary' | 'outline',
    disabled?: boolean,
} & ({ onClick?: () => any } | { to?: string, target?: '_blank' })
const definedProps = withDefaults(defineProps<props>(), {
  variant: 'primary'
})

const baseClasses = 'block px-6 py-2 border rounded disabled:opacity-50'

const variantClasses = computed(() => {
  switch (definedProps.variant) {
    case 'primary':
      return 'bg-dark text-light dark:bg-light dark:text-dark'
    case 'secondary':
      return 'bg-light text-dark dark:bg-dark dark:text-light'
    case 'outline':
      return 'text-dark dark:text-light'
  }
})
</script>

<template>
  <NuxtLink v-if="to" :disabled="disabled" :class="[baseClasses, variantClasses]" :target="target" :to="to">
    <div class="text-center font-bold tracking-tight text-sm">
      <slot />
    </div>
  </NuxtLink>
  <button v-if="onClick" :disabled="disabled" :class="[baseClasses, variantClasses]" @click="onClick">
    <div class="text-center font-bold tracking-tight text-sm">
      <slot />
    </div>
  </button>
</template>

<style scoped>
/* Optional: Additional styling for hover effects */
button:hover {
    transition: background-color 0.3s ease;
}
</style>
