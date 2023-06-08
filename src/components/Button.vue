<template>
  <button
    class="border-2 font-bold rounded px-2 py-1 border-[#FCCD2A] text-[#1E5084] bg-[#FCCD2A] disabled:bg-[#1E5084] disabled:border-[#FCCD2A] disabled:text-white w-[10rem]"
    @click="$emit('clicked')"
    :disabled="btnDisabled"
  >
    <span>{{ text }}</span>
  </button>
</template>

<script setup>
const emits = defineEmits(['clicked'])
const props = defineProps({
  btnDisabled: {
    type: Boolean,
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped>

</style>