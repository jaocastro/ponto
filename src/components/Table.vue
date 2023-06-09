<template>
  <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
    <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
      <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Data</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Hora início</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Almoço início</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Almoço fim</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Hora fim</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Tempo total</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
      </tr>
      </thead>

      <tbody v-if="loading">
      <tr>
        <td colspan="7">
          <Loader />
        </td>
      </tr>
      </tbody>

      <tbody v-else-if="propLength === 0">
      <tr>
        <td colspan="7">
          <div class="flex justify-center items-center my-4">
            Sem registros!
          </div>
        </td>
      </tr>
      </tbody>

      <tbody
        v-else
        class="divide-y divide-gray-100 border-t border-gray-100"
        v-for="(item, index) in props.pontos.items" :key="index"
      >
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4">{{ item.id }}</td>
        <td class="px-6 py-4">{{ toHour(item.start) }}</td>
        <td class="px-6 py-4">{{ toHour(item.startLunch) }}</td>
        <td class="px-6 py-4">{{ toHour(item.endLunch) }}</td>
        <td class="px-6 py-4">{{ toHour(item.end) }}</td>
<!--        <td class="px-6 py-4">{{ item.tempo }}</td>-->
        <td class="px-6 py-4">
          <div class="flex justify-end gap-4">
            <a @click="deletePonto(item.id)">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
              </svg>
            </a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {toHour} from "@/utils/date-helper.js";
import Loader from "@/components/Loader.vue";
import {computed} from "vue";

const props = defineProps({
  pontos: {
    type: Object,
  },
  loading: {
    type: Boolean,
  }
})

const emit = defineEmits(['delItem'])
const propLength = computed(() => {
  return props.pontos.count
});

function deletePonto(id) {
  emit('delItem', id)
}

</script>

<style scoped>

</style>