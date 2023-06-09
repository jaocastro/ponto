<template>
  <div>
    <div class="flex justify-between mt-5 font-bold">
      <PresentDate @date="date = $event" />
      <Cronometro :pause="pause" :reset="reset"/>
    </div>

    <div class="flex items-center justify-center w-full gap-10 mt-5">
      <Button
          v-for="item in pontosTime"
          @clicked="state(item.id)"
          :text="item.status"
          :btn-disabled="(atual !== item.status)"
      />
    </div>

    <div v-show="!moreItens" class="w-full justify-center flex mt-5">
      <span class="bg-red-400 rounded-sm w-full text-center py-2">Não é possível criar mais de um ponto por dia!</span>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Button from "@/components/Button.vue";
import Cronometro from "@/components/Cronometro.vue";
import PresentDate from "@/components/PresentDate.vue";
import TimesheetService from "@/network/services/timesheet-service.js";
import {toBrDate} from "@/utils/date-helper.js";
import {usePontoStore} from "@/stores/ponto.js";

const emit = defineEmits(['refreshTable'])
const pause = ref(false)
const date = ref('')
const pontoStore = usePontoStore()
const moreItens = ref(false)
const reset = ref(false)
const pontosTime = ref([
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

async function isPossibleNewDate(tipo) {
  let verificarData = await pontoStore.validateDay()

  if (toBrDate(verificarData) === toBrDate() && verificarData !== null && tipo === 0) {
    moreItens.value = false
    return false
  }
  moreItens.value = true
  return true
}

async function state(tipo) {
  if (await isPossibleNewDate(tipo)) {
    if (tipo === pontosTime.value.length - 1) {
      await attPonto(tipo)
      pause.value = false
      reset.value = true
      atual.value = pontosTime.value[0].status
    } else {
      if (tipo === 0) {
        await firstPonto()
            .then((e) => {
              return localStorage.setItem('id', e.data.id)
            })

      } else {
        await attPonto(tipo)

        if (tipo === 1) {
          pause.value = false
        }

        if (tipo === 2) {
          pause.value = true
        }

      }
      atual.value = pontosTime.value[tipo+1].status
    }

    salvarLocalStorege()
  }
}

function attPonto(tipo) {
  let obj = {
    1: {
      startLunch: new Date().toLocaleTimeString()
    },
    2: {
      endLunch: new Date().toLocaleTimeString()
    },
    3: {
      end: new Date().toLocaleTimeString()
    }
  }

  return TimesheetService
      .putTimesheet({
        body: obj[tipo]
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