<template>
  <div class="flex gap-5">
    <span>{{ diaAtual }}</span>
    <span>{{ horaAtual }}</span>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {toHour} from "@/utils/date-helper.js";
import moment from 'moment';

const emit = defineEmits(['date'])
const diaAtual = ref('')
const horaAtual = ref('')

onMounted(() => {
  diaAtual.value = moment().format('DD/MM/YYYY')
  emit('date', diaAtual.value)
})

onMounted(() => {
  setInterval(() => {
    horaAtual.value = moment().format('HH:mm:ss')
  })
})
</script>

<style scoped>

</style>