<script lang="ts" setup>
  import Button from '~/components/ui/Button.vue'
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
    <Button variant="outline" @click="handleThemeSwitch">{{ $colorMode.value }}</Button>
  </div>
</template>


<style>

</style>