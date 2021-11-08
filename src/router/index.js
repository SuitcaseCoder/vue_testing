import { createRouter, createWebHistory } from "vue-router";
import Curriculum from '../pages/Curriculum';
import Homepage from '../pages/Homepage';
import Success from '../pages/Success'


const routes = [
    // Curriculum route: 
        {
            path: '/curriculum',
            name: 'curriculum', 
            component: Curriculum
        },
    // Homepage route
        {
            path: '/',
            name:'homepage',
            component: Homepage
        },
    // Success route
        {
            path: '/success',
            name:'success',
            component: Success
        },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
})

export default router;