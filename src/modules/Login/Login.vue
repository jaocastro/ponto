<template>
  <div class="flex">
    <section class="w-full bg-white">
      <div class="container">
        <div class="flex items-center mt-20 flex-col">
          <div class="w-[534px] flex flex-col items-center">
            <div>
              <h1 class="font-bold text-[44px]">Bem vindo</h1>
            </div>

            <form action="#" class="mt-16 flex flex-col gap-6">
              <div class="flex w-[320px] flex-col items-end gap-6">
                <div class="relative w-full">
                  <input
                    type="text" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-[4px] border border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    v-model="inputsValue.userID"
                  />
                  <label
                    for="floating_outlined"
                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >Endereço de email</label>
                </div>

                <div class="relative w-full">
                  <input
                      type="password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-[4px] border border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      v-model="inputsValue.accessKey"
                  />
                  <label
                      for="floating_outlined"
                      class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >Senha</label>
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