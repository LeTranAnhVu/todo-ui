import TaskPage from '@/pages/TaskPage.vue'
import CreateNewTaskPage from '@/pages/CreateNewTaskPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/components/layout/Layout.vue'

const routes = [
    { path: '/', redirect: { name: 'tasks' } },
    { path: '/login', component: LoginPage },
    {
        path: '/app',
        component:  Layout, 
        redirect: { name: 'tasks' },
        children: [
            { path: 'tasks', component: TaskPage, name: 'tasks' },
            { path: 'create-task', component: CreateNewTaskPage, name: 'create-task' }
        ]
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
