<script setup lang="ts">

import { useTodosStore } from '@/lib/stores/useTodosStore.ts'
import { computed } from 'vue'
import { TodoDto } from '@/lib/types/TodoDto.ts'

const todosStore = useTodosStore()
const todos = computed<TodoDto[]>(() => todosStore.todos)

</script>

<template>
    <ul>
        <li v-for="todo in todos" :key="todo.id">
            <p>{{todo.name}}</p>
        </li>
    </ul>
</template>

<style scoped>

</style>