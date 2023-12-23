<script setup lang="ts">
import PrimaryOutlineBtn from '@/components/PrimaryOutlineBtn.vue'
import { router } from '@/router.ts'

const backHome = () => {
    router.push({ name: 'home' })
}
</script>

<template>
    <div class="h-screen flex flex-col items-center justify-center">
        <div class="text-center mt-10 mb-[90px]">
            <h1 class="text-3xl font-black">404</h1>
            <h2 class="text-2xl font-bold">Opps! Content Not Found.</h2>
            <p class="text-slate-500">Please go back to Home.</p>
        </div>
        <div class="w-full px-9">
            <PrimaryOutlineBtn @click="backHome">Home</PrimaryOutlineBtn>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>