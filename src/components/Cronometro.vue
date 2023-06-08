<template>
  <section>
    <strong>
      Tempo: {{ tempoDecorrido }}
    </strong>
  </section>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  tempoEmSegundos: {
    type: Number,
    default: 0,
  },
})

const tempoDecorrido = computed(() => {
  return new Date(props.tempoEmSegundos * 1000).toISOString().substr(11,8)
})
</script>

<style scoped>

</style>