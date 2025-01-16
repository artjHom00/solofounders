<script lang="ts" setup>
const colorMode = useColorMode()
const handleThemeSwitch = () => {
  if (colorMode.preference === 'light') {
    colorMode.preference = 'dark'
    return
  }

  colorMode.preference = 'light'
}
</script>
<template>
  <ClientOnly>
    <button class="btn btn-ghost" @click="handleThemeSwitch">
      {{ $colorMode.value }}
    </button>
  </ClientOnly>
</template>

<style>

</style>
