import {createRouter, createWebHistory} from "vue-router";
import Template from "./modules/Template/Template.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Template,
        meta: {},
    }
]

const router = createRouter({history: createWebHistory(), routes})

export default router