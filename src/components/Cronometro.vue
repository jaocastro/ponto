<template>
  <section>
    <strong>
      Tempo: {{ tempoDecorrido }}
    </strong>
  </section>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";

const props = defineProps({
  pause: {
    type: Boolean,
    default: false,
  },
  reset: {
    type: Boolean,
    default: false,
  }
})

const tempoEmSegundos = ref(0)
const count = ref(0)

onMounted(() => {
  count.value = setInterval(() => {
    if (props.pause) {
      tempoEmSegundos.value += 1
    }
  }, 1000)
})

watch(() => props.reset, () => {
  if (props.reset) {
    tempoEmSegundos.value = 0
  }
})

const tempoDecorrido = computed(() => {
  return new Date(tempoEmSegundos.value * 1000).toISOString().substr(11,8)
})
</script>

<style scoped>

</style>