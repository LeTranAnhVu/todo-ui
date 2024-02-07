<script setup lang="ts">
import BottomDrawer from '@/components/BottomDrawer.vue'

</script>

<template>
    <div class="max-w-[450px] mx-auto pt-5 h-screen overflow-hidden relative">
        <router-view></router-view>
        <BottomDrawer></BottomDrawer>
    </div>
</template>

<style scoped></style>