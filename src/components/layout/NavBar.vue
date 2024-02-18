<script setup lang="ts">

import useAppStore from '@/lib/stores/useAppStore.ts'

const app = useAppStore()
const swipeTo = (dir: 'ltr' | 'rtl') => {
    app.transitionDirection = dir === 'ltr' ? 'slide-ltr' : 'slide-rtl'
}
</script>

<template>
    <div class="navbar">
        <router-link :to="{name: 'home'}" class="navbar-item" @click="() => swipeTo('rtl')">
            Home
        </router-link>
        <router-link disabled to="/reports" class="navbar-item">
            Reports
        </router-link>
        <router-link :to="{name: 'tasks'}" class="navbar-item"  @click="() => swipeTo('ltr')">
            Tasks
        </router-link>
    </div>
</template>

<style scoped lang="scss">
.navbar {
    @apply flex flex-nowrap items-center justify-center
    ring-2 ring-black rounded-lg
    p-0.5;

    .navbar-item {
        @apply grow
        text-center text-black font-medium rounded-lg py-0.5;
        &.router-link-active {
            @apply text-white font-normal bg-black;
        }

        &[disabled] {
            @apply opacity-50 pointer-events-none;
        }
    }

}
</style>