<script setup lang="ts">

import LayoutPage from '@/components/layout/Layout.vue'
</script>

<template>
    <div class="max-w-[500px] mx-auto">
        <LayoutPage>
            <router-view></router-view>
        </LayoutPage>
    </div>
</template>

<style scoped></style>