<template>
  <div class="flex flex-col items-center h-auto">
    <div class="flex w-full justify-between gap-10">
      <div>
        logo
      </div>

      <div>
        Olá, <strong>{{ user }}</strong>!
      </div>

      <div>
        <button @click="logout">Sair</button>
      </div>
    </div>

    <Temporizador @refresh-table="getTimesheet" />
    <PontoTable :pontos="pontos" :loading="loading" @del-item="deletePonto($event)"/>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import PontoTable from "@/components/Table.vue";
import UserService from "@/network/services/user-service.js";
import router from "@/router.js";
import TimesheetService from "@/network/services/timesheet-service.js";
import Loader from "@/components/Loader.vue";
import {usePontoStore} from "@/stores/ponto.js";
import Temporizador from "@/components/Temporizador.vue";

const pontos = ref([])
const loading = ref(false)
const user = ref({})
const pontoStore = usePontoStore()

const verificar = ref(0)

onMounted(() => {
  user.value = UserService.getUser()
  getTimesheet()
})

async function getTimesheet() {
  loading.value = true
  await pontoStore.getTimeSheet()
      .then(() => {
        pontos.value = pontoStore.pontos
      })
      .finally(() => {
        loading.value = false
      })
}

function deletePonto(id) {
  TimesheetService
      .delete(id)
      .finally(() => {
        getTimesheet()
      })
}

function logout() {
  if (UserService.logout) {
    router.push({name: 'Login'})
  }
}
</script>

<style scoped>

</style>