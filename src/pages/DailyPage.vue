<script setup lang="ts">
import TodoStatusList from '@/components/TodoStatusList.vue'
import Spinner from '@/components/Spinner.vue'
import { useTodosStore } from '@/lib/stores/useTodosStore.ts'
import { useTodoStatusesStore } from '@/lib/stores/useTodoStatusesStore.ts'
import { computed, onMounted, ref } from 'vue'
import { addDays } from '@/lib/helpers/addDays.ts'
import { parseUTCDate } from '@/lib/helpers/parseUTCDate.ts'

const todosStore = useTodosStore()
const todoStatusesStore = useTodoStatusesStore()

const isLoading = ref(false)

onMounted(async () => {
    isLoading.value = true
    await todosStore.fetchTodos()
    await todoStatusesStore.fetchTodoStatuses()
    isLoading.value = false
})

const displayedDates = computed<Date[]>(() => {
    // TODO find good way to handle utc
    const today = parseUTCDate(new Date().toUTCString())
    return [...[3, 2, 1].map(offset => addDays(today, offset)), today, ...[-1, -2, -3].map(offset => addDays(today, offset))]
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
            <TodoStatusList
                v-for="date in displayedDates"
                :key="date.toUTCString()"
                :date="date" />
        </template>
    </div>
</template>