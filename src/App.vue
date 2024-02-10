<script setup lang="ts">

import { useAuth0 } from '@auth0/auth0-vue'
import { watch } from 'vue'
import { useTodosStore } from '@/lib/stores/useTodosStore.ts'
import { useTodoStatusesStore } from '@/lib/stores/useTodoStatusesStore.ts'
import { router } from '@/router.ts'
import { useRoute } from 'vue-router'

const { isAuthenticated, isLoading } = useAuth0()
const todosStore = useTodosStore()
const todoStatusesStore = useTodoStatusesStore()
const route = useRoute()

watch([isAuthenticated, isLoading], async () => {
    if (!isLoading.value && isAuthenticated.value) {
        await todosStore.fetchTodos()
        await todoStatusesStore.fetchTodoStatuses()
    } else {
        console.log('Stop fetch data because: ','loading:', isLoading.value, 'isAuthn', isAuthenticated.value)
    }
})

watch(route, (from, to) => {
    if (to.name !== 'login' && !isAuthenticated.value) {
        router.push({ name: 'login' })
    } else if (to.name === 'login' && isAuthenticated.value) {
        router.push({ name: 'home' })
    }
})
</script>

<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<style scoped></style>