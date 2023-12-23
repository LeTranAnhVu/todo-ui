<script setup lang="ts">
import logoName from '@/assets/logo_name.svg'
import NakedDangerBtn from '@/components/NakedDangerBtn.vue'
import NavBar from '@/components/layout/NavBar.vue'
</script>

<template>
<div class="flex-col w-full">
    <div class="header flex px-4">
        <div class="buffer grow"></div>
        <div class="w-max">
            <NakedDangerBtn>Sign out</NakedDangerBtn>
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