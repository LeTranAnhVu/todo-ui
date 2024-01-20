<script setup lang="ts">

import { useTodosStore } from '@/lib/stores/useTodosStore.ts'
import { computed, onMounted } from 'vue'

const todosStore = useTodosStore()
onMounted(async () => {
    console.log('call fetch')
    await todosStore.fetchTodos()
    console.log('fetched')
})

const todos = computed(() => todosStore.todos)
</script>

<template>
    <div class="max-w-[450px] mx-auto pt-5">
        <router-view></router-view>
        <code>{{ todos }}</code>
    </div>
</template>

<style scoped></style>