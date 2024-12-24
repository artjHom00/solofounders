<script lang="ts" setup>
type props = {
    variant?: 'primary' | 'secondary',
} & ({ onClick?: () => any } | { to?: string, target?: '_blank' })
const definedProps = withDefaults(defineProps<props>(), {
    variant: 'primary',
    to: '#',
});

const baseClasses = 'px-6 py-1 border';

const variantClasses = computed(() => {
    return definedProps.variant === 'primary'
        ? 'bg-dark text-light dark:bg-light dark:text-dark'
        : 'bg-light text-dark dark:bg-dark dark:text-light';
});
</script>

<template>
    <NuxtLink :class="[baseClasses, variantClasses]" :target="target" :to="to" v-if="to">
        <div class="text-center font-bold tracking-tight text-sm cursor-pointer">
            <slot />
        </div>
    </NuxtLink>
    <button :class="[baseClasses, variantClasses]" @click="onClick" v-if="onClick">
        <div class="text-center font-bold tracking-tight text-sm cursor-pointer">
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