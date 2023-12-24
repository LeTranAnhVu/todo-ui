<script setup lang="ts">
import logo from '@/assets/todo_logo.svg'
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect } = useAuth0()
const handleLogin = () => {
    loginWithRedirect()
}
</script>


<template>
    <div class="h-screen flex flex-col items-center justify-center">
        <img class="w-1/3" :src="logo" alt="">
        <div class="text-center mt-10 mb-[90px]">
            <h1 class="text-3xl font-semibold">Welcome to <span class="font-bold">TO_DO</span></h1>
            <p class="text-slate-500">Build your target, get your dream</p>
        </div>
        <div class="w-full px-9">
            <Btn variant="primary-outline" @click="handleLogin">Login</Btn>
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>