<script setup lang="ts">
import DailyTodoStatusList from '@/components/DailyTodoStatusList.vue'
import Spinner from '@/components/Spinner.vue'
import { useTodosStore } from '@/lib/stores/useTodosStore.ts'
import { useTodoStatusesStore } from '@/lib/stores/useTodoStatusesStore.ts'
import { computed, ref } from 'vue'
import { addDays } from '@/lib/helpers/addDays.ts'
import { parseUTCDate } from '@/lib/helpers/parseUTCDate.ts'
import Switch from '@/components/Switch.vue'

const todosStore = useTodosStore()
const todoStatusesStore = useTodoStatusesStore()

const isLoading = computed(() => todosStore.isProcessing === 'get-all' || todoStatusesStore.isProcessing === 'get-all')

const displayedDates = computed<Date[]>(() => {
    // TODO find good way to handle utc
    const today = parseUTCDate(new Date().toUTCString())
    return [...[1].map(offset => addDays(today, offset)), today, ...[-1].map(offset => addDays(today, offset))]
})
const toggle = ref(true)
</script>

<template>
    <div class="flex flex-col gap-10">
        <template v-if="isLoading">
            <div class="mx-auto mt-10">
                <Spinner />
            </div>
        </template>
        <template v-else>
            <div class="ml-auto">
                <Switch v-model="toggle" label="Show daily tasks" right />

            </div>
            <DailyTodoStatusList
                v-for="date in displayedDates"
                :key="date.toUTCString()"
                :date="date" />
        </template>
    </div>
</template>