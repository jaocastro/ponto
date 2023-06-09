import { defineStore } from "pinia";
import TimesheetService from "@/network/services/timesheet-service.js";

export const usePontoStore = defineStore('ponto', {
    state: () => ({
        ponto: {
            id: null,
            start: null,
            startLunch: null,
            endLunch: null,
            end: null,
        },
        pontos: []
    }),
    getters: {
        lastPonto: state => {
            return state.ponto
        },
    },
    actions: {
        async getTimeSheet() {
            await TimesheetService.getTimesheet()
                .then((response) => {
                    this.pontos = response.data
                    this.ponto = response.data.items[0]
                    return response
                })
        },
    },
})