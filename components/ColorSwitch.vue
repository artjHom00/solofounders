<script lang="ts" setup>
  const colorMode = useColorMode()
  const handleThemeSwitch = () => {
    if(colorMode.preference === 'light') {
      colorMode.preference = 'dark'
      return
    }

    colorMode.preference = 'light'
    return
  }
</script>
<template>
  <div>
    <div class=" border px-6 py-1 text-center font-bold tracking-tight text-sm cursor-pointer" @click="handleThemeSwitch">{{ $colorMode.value }}</div>
  </div>
</template>


<style>

</style>