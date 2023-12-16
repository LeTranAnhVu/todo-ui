<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import type { TodoItemType } from '@/lib/types/TodoItem.ts'

const item: TodoItemType = {
    name: 'Learn Piano',
    isCompleted: false,
    items: [
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
    ] as TodoItemType[]
}

const item2: TodoItemType = {
    name: 'Learn Coding',
    isCompleted: false,
    items: [
        {
            name: 'task 1',
            isCompleted: false,
        },
        {
            name: 'task 2',
            isCompleted: false,
        },
    ] as TodoItemType[]
}

const tasks = [item,  item2]

</script>

<template>
    <div>
        <TodoList :date="new Date(2023, 11, 15)" :tasks="tasks"></TodoList>
    </div>
</template>

<style scoped>

</style>