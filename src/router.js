import {createRouter, createWebHistory} from "vue-router";
import Login from "@/modules/Login/Login.vue";
import Template from "./modules/Template/Template.vue";
import PontoEletronico from "@/modules/Home/PontoEletronico.vue";

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Home',
        component: Template,
        redirect: {name: 'PontoEletronico'},
        children: [
            {
                path: '/pontoeletronico',
                name: 'PontoEletronico',
                component: PontoEletronico,
                meta: {},
            },
        ]
    }
]

const router = createRouter({history: createWebHistory(), routes})

export default router