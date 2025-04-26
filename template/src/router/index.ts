import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'Home',
            path: '/',
            component: () => import("../components/Home.vue"),
            children: [],
            props: true
        },
        {
            name: 'Tool',
            path: '/tool',
            component: () => import('../components/Tool.vue'),
            children: [],
            props: true
        },
        {
            name: 'Setting',
            path: '/setting',
            component: () => import('../components/Setting.vue'),
            props: true
        },
    ]
});

export default router
