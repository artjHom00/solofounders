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
    <button class="btn btn-ghost" @click="handleThemeSwitch" v-if="colorMode.unknown === false">
      <i class="fa-regular fa-moon text-lg w-4" v-if="colorMode.value === 'dark'"></i>
      <i class="fa-regular fa-sun text-lg w-4" v-else></i>
    </button>
</template>

<style>

</style>
