import DailyPage from '@/pages/DailyPage.vue'
import TaskPage from '@/pages/TaskPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/components/layout/Layout.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import { useAuth0 } from '@auth0/auth0-vue'

const routes = [
    { path: '/', redirect: { name: 'daily' }, name: 'home' },
    { path: '/login', component: LoginPage, name: 'login' },
    {
        path: '/app',
        component: Layout,
        redirect: { name: 'daily' },
        children: [
            { path: 'daily', component: DailyPage, name: 'daily' },
            { path: 'tasks', component: TaskPage, name: 'tasks' },
        ]
    },
    { path: '/:pathMatch(.*)', component: NotFoundPage }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to) => {
    const { isAuthenticated } = useAuth0()
    const isAuthenticatedValue = isAuthenticated.value
    if (to.name !== 'login' && !isAuthenticatedValue) {
        return { name: 'login' }
    } else if (to.name === 'login' && isAuthenticatedValue) {
        return { name: 'home' }
    }
})

