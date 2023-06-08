<template>
  <div>
    <div class="flex justify-between mt-5 font-bold">
      <PresentDate @date="date = $event"/>
      <Cronometro :tempoEmSegundos="tempoEmSegundos"/>
    </div>

    <div class="flex items-center justify-center w-full gap-10 mt-5">
      <Button @clicked="iniciar('inicio')" text="CHEGUEI" />
      <Button @clicked="iniciar('almoco')" text="FUI ALMOÇAR" />
      <Button @clicked="iniciar('voltaAlmoco')" text="VOLTEI" />
      <Button @clicked="iniciar('saida')" text="FUI" />
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import Button from "@/components/Button.vue";
import Cronometro from "@/components/Cronometro.vue";
import PresentDate from "@/components/PresentDate.vue";
import TimesheetService from "@/network/services/timesheet-service.js";

const emit = defineEmits(['newItem'])

const cronometroRodando = ref(false)
const almocoIniciado = ref(false)
const voltarAlmocoIniciado = ref(false)
const horaInicio = ref('')
const horaAlmoco = ref('')
const horaVoltaAlmoco = ref('')
const horaSaida = ref('')
const cronometro = ref(0)
const tempoEmSegundos = ref(0)
const date = ref('')

function iniciar(tipo) {
  const acoes = {
    inicio: () => {
      cronometroRodando.value = true
      cronometro.value = setInterval(() => {
        this.tempoEmSegundos += 1
      }, 1000)
      horaInicio.value = new Date().toLocaleTimeString()
    },
    almoco: () => {
      almocoIniciado.value = true
      horaAlmoco.value = new Date().toLocaleTimeString()
    },
    voltaAlmoco: () => {
      voltarAlmocoIniciado.value = true
      horaVoltaAlmoco.value = new Date().toLocaleTimeString()
    },
    saida: () => {
      cronometroRodando.value = false
      clearInterval(cronometro.value)
      horaSaida.value = new Date().toLocaleTimeString()

      salvar();
    },
  }
  acoes[tipo]()
}

function salvar () {
  TimesheetService
      .create()
      .then(response => {
        console.log(response)
      })

  // emit('newItem', obj)
  tempoEmSegundos.value = 0
}


</script>

<style scoped>

</style>