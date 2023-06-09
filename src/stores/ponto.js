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
        pontos: [],
        date:[]
    }),
    getters: {
        lastPonto: state => {
            return state.ponto
        },
    },
    actions: {
        async getTimeSheet() {
            return await TimesheetService.getTimesheet()
                .then((response) => {
                    if (response.data !== undefined && response.data.items.length > 0) {
                        this.pontos = response.data
                        this.ponto = response.data.items[0]
                        this.date = response.data.items[0].start
                    }
                    return response
                })
        },

        async validateDay() {
            return await TimesheetService.getTimesheet()
                .then((response) => {
                    if (response.data !== undefined && response.data.items.length > 0) {
                        return response.data.items[0].start
                    }
                    return null
                })
        },
    },
})