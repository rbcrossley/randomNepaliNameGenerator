import {createRouter, createWebHistory} from "vue-router"

import routes from './route.js'

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {top: 0};
        }
    },
})

export default router;
