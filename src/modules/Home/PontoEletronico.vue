<template>
  <div class="flex flex-col items-center h-auto">
    <div class="flex w-full justify-between gap-10 items-center">
      <div>
        <img class="w-[120px]" src="../../assets/logothera.jpeg" alt="">
      </div>

      <div class="mr-10">
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
import {onMounted, ref} from "vue";
import PontoTable from "@/components/Table.vue";
import UserService from "@/network/services/user-service.js";
import router from "@/router.js";
import TimesheetService from "@/network/services/timesheet-service.js";
import {usePontoStore} from "@/stores/ponto.js";
import Temporizador from "@/components/Temporizador.vue";

const pontos = ref([])
const loading = ref(false)
const user = ref({})
const pontoStore = usePontoStore()

onMounted(() => {
  user.value = UserService.getUser()
  getTimesheet()
})

async function getTimesheet() {
  loading.value = true
  TimesheetService.getTimesheet()
      .then((response) => {
        pontos.value = response.data
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