<script setup lang="ts">

import LayoutPage from '@/components/layout/Layout.vue'
import CreateNewTaskPage from '@/pages/CreateNewTaskPage.vue'
import TaskPage from '@/pages/TaskPage.vue'
</script>

<template>
    <div class="max-w-[500px] mx-auto">
        <LayoutPage>
<!--            <TaskPage></TaskPage>-->
            <CreateNewTaskPage></CreateNewTaskPage>
        </LayoutPage>
    </div>
</template>

<style scoped></style>