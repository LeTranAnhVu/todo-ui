import TaskPage from '@/pages/TaskPage.vue'
import CreateNewTaskPage from '@/pages/CreateNewTaskPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/components/layout/Layout.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
    { path: '/', redirect: { name: 'tasks' }, name: 'home' },
    { path: '/login', component: LoginPage, name: 'login' },
    {
        path: '/app',
        component: Layout,
        redirect: { name: 'tasks' },
        children: [
            { path: 'tasks', component: TaskPage, name: 'tasks' },
            { path: 'create-task', component: CreateNewTaskPage, name: 'create-task' }
        ]
    },
    { path: '/:pathMatch(.*)', component: NotFoundPage }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
