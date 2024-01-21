<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import type { TodoTask } from '@/lib/types/TodoTask.ts'
import { cloneDeep } from 'lodash'
import { useTodosStore } from '@/lib/stores/useTodosStore.ts'
import { useTodoStatusesStore } from '@/lib/stores/useTodoStatusesStore.ts'
import { onMounted, ref } from 'vue'
import { addDays } from '@/lib/helpers/addDays.ts'

const task: TodoTask = {
    name: 'Learn Piano',
    isCompleted: false,
    tasks: [
        {
            name: 'task 1',
            isCompleted: false
        },
        {
            name: 'task 2',
            isCompleted: false
        },
        {
            name: 'task 3',
            isCompleted: true
        }
    ] as TodoTask[]
}

const task2: TodoTask = {
    name: 'Learn Coding',
    isCompleted: false,
    tasks: [
        {
            name: 'task 1',
            isCompleted: false
        },
        {
            name: 'task 2',
            isCompleted: false
        }
    ] as TodoTask[]
}

const tasks = [task, task2]
const tasks2 = cloneDeep(tasks)


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
        <template v-if="!isLoading">
            <TodoList :date="addDays(new Date(), 1)" :tasks="tasks"></TodoList>
            <TodoList :date="new Date()" :tasks="tasks"></TodoList>
            <TodoList :date="new Date(2023, 11, 15)" :tasks="tasks2"></TodoList>
        </template>
    </div>
</template>

<style scoped>

</style>