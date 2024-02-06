<script setup lang="ts">
import { computed } from 'vue'
import { useTodosStore } from '@/lib/stores/useTodosStore.ts'
import TodoItem from '@/components/TodoItem.vue'

const todos = computed(() => useTodosStore().todos)
</script>

<template>
    <div class="list">
        <TodoItem v-for="todo in todos" :key="todo.id" :item="todo" />
    </div>
</template>

<style scoped>
.list {
    @apply flex flex-col gap-3;
}
</style>