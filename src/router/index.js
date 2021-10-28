import { createRouter, createWebHistory } from "vue-router";
import Curriculum from '../pages/Curriculum';
import Homepage from '../pages/Homepage';

const routes = [
    // Curriculum route: 
        {
            path: '/curriculum',
            name: 'curriculum', 
            component: Curriculum
        },
    // Homepage route
        {
            path: '/homepage',
            name:'homepage',
            component: Homepage
        }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
})

export default router;