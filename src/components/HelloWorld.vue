<template>
  <p class="read-the-docs bg-red-400">Click on the Vite and Vue logos to learn more</p>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
