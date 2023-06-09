<template>
  <div>
    <div class="flex justify-between mt-5 font-bold">
      <PresentDate @date="date = $event"/>
      <Cronometro :pause="pause"/>
    </div>

    <div class="flex items-center justify-center w-full gap-10 mt-5">
      <Button
          v-for="item in pontos"
          @clicked="iniciar(item.id)"
          :text="item.status"
          :btn-disabled="(atual !== item.status)"
      />
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Button from "@/components/Button.vue";
import Cronometro from "@/components/Cronometro.vue";
import PresentDate from "@/components/PresentDate.vue";
import TimesheetService from "@/network/services/timesheet-service.js";

const emit = defineEmits(['refreshTable'])
const horaAlmoco = ref('')
const horaVoltaAlmoco = ref('')
const horaSaida = ref('')
const pause = ref(false)
const date = ref('')
const pontos = ref([
  {
    id: 0,
    status: 'CHEGUEI',
    type: 'start',
  },
  {
    id: 1,
    status: 'FUI ALMOCAR',
    type: 'startLunch',
  },
  {
    id: 2,
    status: 'VOLTEI',
    type: 'endLunch',
  },
  {
    id: 3,
    status: 'FUI',
    type: 'end',
  },
])
onMounted(() => {
  atual.value = getAtual()
})

const atual = ref('CHEGUEI')

function salvarLocalStorege() {
  return localStorage.setItem('atual', atual.value)
}

function getAtual() {
  return localStorage.getItem('atual') || 'CHEGUEI'
}

async function iniciar(tipo) {
  if (tipo === pontos.value.length - 1) {
    await attPonto()
    atual.value = pontos.value[0].status
  } else {
    if (tipo === 0) {
      await firstPonto()
          .then((e) => {
            return localStorage.setItem('id', e.data.id)
          })
    } else {
      await attPonto()
    }
    atual.value = pontos.value[tipo+1].status
  }

  salvarLocalStorege()
}

function attPonto() {
  return TimesheetService
      .putTimesheet({
        body: {
          startLunch: horaAlmoco.value,
          endLunch: horaVoltaAlmoco.value,
          end: horaSaida.value,
        }
      })
      .then((e) => {
        emit('refreshTable')
        return e
      })
}

function firstPonto() {
  pause.value = true
  return TimesheetService
      .post('')
      .then((e) => {
        emit('refreshTable')
        return e
      })
}

</script>

<style scoped>

</style>