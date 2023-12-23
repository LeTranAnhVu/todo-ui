<script setup lang="ts">
import logo from '@/assets/todo_logo.svg'
import PrimaryOutlineBtn from '@/components/PrimaryOutlineBtn.vue'
import { router } from '@/router.ts'

const handleLogin = () => {
    router.push({name: 'home'})
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
            <PrimaryOutlineBtn @click="handleLogin">Login</PrimaryOutlineBtn>
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>