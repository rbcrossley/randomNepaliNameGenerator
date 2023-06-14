<script setup lang="ts">
interface ButtonProps {
  title: string
  buttonType: string
}


const props = withDefaults(defineProps<ButtonProps>(), {
  title: 'Button',
  buttonType: 'primary',
})
</script>

<template>
  <button :class="`btn btn-${buttonType}`">
    <slot>{{ title }}</slot>
  </button>
</template>

<style scoped>

</style>
