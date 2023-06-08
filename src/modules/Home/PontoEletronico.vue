<template>
  <div class="flex flex-col items-center">
    <div class="flex w-full justify-between gap-10">
      <div>
        logo
      </div>

      <div>
        Olá, {{ user }}!
      </div>

      <div>
        <button @click="logout">Sair</button>
      </div>
    </div>

    <PontoTemp />
    <PontoTable :items="pontos"/>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import PontoTable from "@/components/PontoTable.vue";
import PontoTemp from "@/components/PontoTemp.vue";
import UserService from "@/network/services/user-service.js";
import router from "@/router.js";
import TimesheetService from "@/network/services/timesheet-service.js";

const pontos = ref([])
function teste(a) {
  pontos.value.push(a)
  console.log(a)
}

const user = ref({})

onMounted(() => {
  user.value = UserService.getUser()
  getTimesheet()
})

function getTimesheet() {
  TimesheetService.getTimesheet()
      .then((response) => {
        pontos.value = response.data
        console.log(response.data)
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