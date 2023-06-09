<template>
  <div class="flex">
    <section class="w-full h-screen bg-[#F5F6F7]">
      <div class="container">
        <div class="flex items-center mt-20 flex-col">
          <div class="w-[534px] flex flex-col items-center">
            <div>
              <h1 class="font-bold text-[44px]">Bem vindo</h1>
            </div>

            <form action="#" class="mt-16 flex flex-col gap-6 bg-white p-10 rounded-lg shadow-xl">
              <div class="flex w-[320px] flex-col items-end gap-6">
                <div class="relative w-full">
                  <label class="font-semibold">Endereço de email</label>
                  <input v-model="inputsValue.userID" type="text" placeholder="Email" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">

                </div>

                <div class="relative w-full">
                  <label class="font-semibold">Senha</label>
                  <input v-model="inputsValue.accessKey" type="password" placeholder="Email" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                </div>
              </div>

              <div class="actions">
                <div class="flex w-full justify-center flex-col">
                  <button
                      class="bg-blue-500 w-full h-[48px] text-white px-[32px] rounded-[4px] font-[600] hover:opacity-[.9] transition"
                      type="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      @click="sendLogin()"
                  >
                    Entrar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {ref} from "vue";
import LoginService from "@/network/services/login-service.js";
import router from "@/router.js";

const inputsValue = ref({
  userID: null,
  accessKey: null,
  grantType: 'password',
})

function sendLogin() {
  LoginService
      .login(inputsValue.value)
      .then(response => {
        router.push({name: 'Home'})
      })
      .catch((err) => {
        console.log(err.response)
      })
}

</script>

<style scoped>
h1 {
  color: #2d333a;
}

.container {
  max-width: 1200px;
  display: block;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
}

</style>