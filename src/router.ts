import TaskPage from '@/pages/TaskPage.vue'
import CreateNewTaskPage from '@/pages/CreateNewTaskPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {path: '/', redirect: '/tasks'},
    {path: '/tasks', component: TaskPage},
    {path: '/create-task', component: CreateNewTaskPage},
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
