import HomePage from '@/pages/HomePage.vue'
import TaskPage from '@/pages/TaskPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/components/layout/Layout.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import useAppStore from '@/lib/stores/useAppStore.ts'

const routes = [
    { path: '/', redirect: { name: 'home' }, name: 'root' },
    { path: '/login', component: LoginPage, name: 'login' },
    {
        path: '/app',
        component: Layout,
        redirect: { name: 'home' },
        children: [
            { path: 'home', component: HomePage, name: 'home', meta: { ltrIndex: 1 } },
            { path: 'tasks', component: TaskPage, name: 'tasks', meta: { ltrIndex: 2 } }
        ]
    },
    { path: '/:pathMatch(.*)', component: NotFoundPage }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from) => {
    const appSettings = useAppStore()
    if (typeof from.meta?.ltrIndex === 'number'
        && typeof to.meta?.ltrIndex === 'number'
        && from.meta.ltrIndex > to.meta.ltrIndex) {
        appSettings.transitionDirection = 'slide-rtl'
    } else {
        appSettings.transitionDirection = 'slide-ltr'
    }
    console.log('waht', appSettings.transitionDirection, from.meta?.ltrIndex, to.meta?.ltrIndex)

})
