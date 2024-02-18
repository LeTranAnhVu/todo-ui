import HomePage from '@/pages/HomePage.vue'
import TaskPage from '@/pages/TaskPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/components/layout/Layout.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
    { path: '/', redirect: { name: 'home' }, name: 'root' },
    { path: '/login', component: LoginPage, name: 'login' },
    {
        path: '/app',
        component: Layout,
        redirect: { name: 'home' },
        children: [
            { path: 'home', component: HomePage, name: 'home' },
            { path: 'tasks', component: TaskPage, name: 'tasks' }
        ]
    },
    { path: '/:pathMatch(.*)', component: NotFoundPage }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
