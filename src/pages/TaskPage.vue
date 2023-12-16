<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import type { TodoTask } from '@/lib/types/TodoTask.ts'
import { cloneDeep } from 'lodash'

const task: TodoTask = {
    name: 'Learn Piano',
    isCompleted: false,
    tasks: [
        {
            name: 'task 1',
            isCompleted: false,
        },
        {
            name: 'task 2',
            isCompleted: false,
        },
        {
            name: 'task 3',
            isCompleted: true,
        }
    ] as TodoTask[]
}

const task2: TodoTask = {
    name: 'Learn Coding',
    isCompleted: false,
    tasks: [
        {
            name: 'task 1',
            isCompleted: false,
        },
        {
            name: 'task 2',
            isCompleted: false,
        },
    ] as TodoTask[]
}

const tasks = [task, task2]
const tasks2 = cloneDeep(tasks)

</script>

<template>
    <div class="flex flex-col gap-10">
        <TodoList :date="new Date()" :tasks="tasks"></TodoList>
        <TodoList :date="new Date(2023, 11, 15)" :tasks="tasks2"></TodoList>
    </div>
</template>

<style scoped>

</style>