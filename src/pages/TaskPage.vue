<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import { useTodosStore } from '@/lib/stores/useTodosStore.ts'
import { useTodoStatusesStore } from '@/lib/stores/useTodoStatusesStore.ts'
import { onMounted, ref } from 'vue'
import { addDays } from '@/lib/helpers/addDays.ts'
import Spinner from '@/components/Spinner.vue'

const todosStore = useTodosStore()
const todoStatusesStore = useTodoStatusesStore()

const isLoading = ref(false)

onMounted(async () => {
    isLoading.value = true
    await todosStore.fetchTodos()
    await todoStatusesStore.fetchTodoStatuses()
    isLoading.value = false
})

</script>

<template>
    <div class="flex flex-col gap-10">
        <template v-if="isLoading">
            <div class="mx-auto mt-10">
                <Spinner />
            </div>
        </template>
        <template v-else>
            <TodoList :date="addDays(new Date(), 1)"></TodoList>
            <TodoList :date="new Date()"></TodoList>
            <TodoList :date="new Date(2023, 11, 15)"></TodoList>
        </template>
    </div>
</template>