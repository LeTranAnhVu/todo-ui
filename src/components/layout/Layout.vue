<script setup lang="ts">
import logoName from '@/assets/logo_name.svg'
import NavBar from '@/components/layout/NavBar.vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { logout, isAuthenticated, user } = useAuth0()
const handleLogout = () => {
    logout()
}
</script>

<template>
    <div class="flex-col w-full">
        <div class="header flex px-4 justify-between">
            <div class="buffer">
                <img v-if="isAuthenticated" :src="user?.picture" alt="" class="h-10 w-10 rounded-full ring-black">
            </div>
            <div class="w-max">
                <Btn variant="danger-sim" @click="handleLogout">Sign out</Btn>
            </div>
        </div>
        <div class="logo mb-10">
            <img class="mx-auto" :src="logoName" alt="">
        </div>
        <div class="px-[50px] mb-10">
            <NavBar></NavBar>
        </div>
        <div class="px-4">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>

</style>