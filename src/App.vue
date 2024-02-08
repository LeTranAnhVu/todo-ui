<script setup lang="ts">

import { useAuth0 } from '@auth0/auth0-vue'
import { watch } from 'vue'
import { useTodosStore } from '@/lib/stores/useTodosStore.ts'
import { useTodoStatusesStore } from '@/lib/stores/useTodoStatusesStore.ts'

const { isAuthenticated } = useAuth0()
const todosStore = useTodosStore()
const todoStatusesStore = useTodoStatusesStore()

watch(isAuthenticated, async () => {
    await todosStore.fetchTodos()
    await todoStatusesStore.fetchTodoStatuses()
})
</script>

<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<style scoped></style>