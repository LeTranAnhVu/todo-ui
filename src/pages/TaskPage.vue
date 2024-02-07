<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import Btn from '@/components/Btn.vue'
import useAppStore from '@/lib/stores/useAppStore.ts'
import { defineAsyncComponent } from 'vue'


const openNewTaskDrawer = () => {
    const appStore = useAppStore()

    appStore.bottomDrawer.isOpened = true
    appStore.bottomDrawer.component = defineAsyncComponent(() => import('@/components/TaskEditor.vue'))

}
</script>

<template>
    <div>
        <div class="absolute bottom-10 right-5 w-[70px]">
            <Btn variant="primary-outline" size="sm" @click="openNewTaskDrawer">New +</Btn>
        </div>
        <TodoList />
    </div>
</template>

<style scoped>

</style>