<script setup lang="ts">
import logoName from '@/assets/logo_name.svg'
import NavBar from '@/components/layout/NavBar.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import BottomDrawer from '@/components/BottomDrawer.vue'
import Toast from '@/features/Toast.vue'
import useAppStore from '@/lib/stores/useAppStore.ts'
import { useSwipe } from '@vueuse/core'
import { ref, watch } from 'vue'
import { router } from '@/router.ts'
import { useRoute } from 'vue-router'

const { logout, isAuthenticated, user } = useAuth0()
const app = useAppStore()
const route = useRoute()

const mainDiv = ref<HTMLDivElement | null>(null)
const { isSwiping, direction } = useSwipe(mainDiv)

watch([isSwiping, direction], ([newIsSwiping, newDirection], [prevIsSwiping, _]) => {
    if (!newIsSwiping && prevIsSwiping && ['left', 'right'].includes(newDirection)) {
        if (newDirection === 'left') {
            app.transitionDirection = 'slide-rtl'
        } else if (newDirection === 'right') {
            app.transitionDirection = 'slide-ltr'
        }

        if (route.name === 'home') {
            router.push({ name: 'tasks' })
        }

        if (route.name === 'tasks') {

            router.push({ name: 'home' })
        }
    }
})

const handleLogout = () => {
    logout()
}

</script>

<template>
    <div class="flex flex-col pt-5 w-full max-w-[450px] mx-auto h-screen overflow-hidden relative">
        <div class="header flex px-4 justify-between">
            <div class="buffer">
                <img v-if="isAuthenticated" :src="user?.picture" alt="" class="h-10 w-10 rounded-full ring-black">
            </div>
            <div class="w-max">
                <Btn variant="link" @click="handleLogout">Sign out</Btn>
            </div>
        </div>
        <div class="logo mb-6">
            <img class="mx-auto" :src="logoName" alt="">
        </div>
        <div class="px-[50px] mb-6">
            <NavBar></NavBar>
        </div>
        <div ref="mainDiv" class="px-4 pt-1 pb-5 overflow-y-scroll flex-grow relative">
            <router-view v-slot="{ Component, route }">
                <transition :name="app.transitionDirection">
                    <component :is="Component" :key="route.path" class="bg-white" />
                </transition>
            </router-view>
        </div>
        <div class="text-center text-sm text-gray-400">v1.0.6</div>

        <BottomDrawer></BottomDrawer>
        <Toast />
    </div>
</template>

<style scoped>
.slide-ltr-enter-active,
.slide-ltr-leave-active,
.slide-rtl-enter-active,
.slide-rtl-leave-active {
    /* minus the gap inside the div that wrap the router-view in Layout, px-4 */
    width: calc(100% - 2rem);
}

</style>