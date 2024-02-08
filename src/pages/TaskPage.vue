<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import Btn from '@/components/Btn.vue'
import useAppStore from '@/lib/stores/useAppStore.ts'
import { computed, defineAsyncComponent } from 'vue'
import Spinner from '@/components/Spinner.vue'
import { useTodosStore } from '@/lib/stores/useTodosStore.ts'

const isLoading = computed(() => useTodosStore().isProcessing === 'get-all')
const openNewTaskDrawer = () => {
    const appStore = useAppStore()

    appStore.bottomDrawer.isOpened = true
    appStore.bottomDrawer.component = defineAsyncComponent(() => import('@/components/TaskEditor.vue'))

}
</script>

<template>
    <div class="flex flex-col">
        <template v-if="isLoading">
            <div class="mx-auto mt-10">
                <Spinner />
            </div>
        </template>
        <template v-else>
            <div class="absolute bottom-10 right-5 w-[70px]">

                <Btn variant="primary-outline" size="sm" @click="openNewTaskDrawer">New +</Btn>
            </div>
            <TodoList />
        </template>
    </div>
</template>

<style scoped>

</style>