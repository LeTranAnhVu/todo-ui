<script setup lang="ts">
import logoName from '@/assets/logo_name.svg'
import NavBar from '@/components/layout/NavBar.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import BottomDrawer from '@/components/BottomDrawer.vue'
import Toast from '@/features/Toast.vue'

const { logout, isAuthenticated, user } = useAuth0()
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
        <div class="px-4 pt-1 pb-5 overflow-y-scroll flex-grow">
            <router-view v-slot="{ Component, route }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" :key="route.path" class="bg-white"  />
                </transition>
            </router-view>
        </div>
        <div class="text-center text-sm text-gray-400">v1.0.0</div>

        <BottomDrawer></BottomDrawer>
        <Toast/>
    </div>
</template>

<style scoped>

</style>