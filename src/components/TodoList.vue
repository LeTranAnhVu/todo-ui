<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue'
import type { TodoTask } from '@/lib/types/TodoTask.ts'
import { computed, toRefs } from 'vue'
import { DateTime } from 'luxon'

type Props = {
    tasks: TodoTask[]
    date: Date
}

const props = defineProps<Props>()

const { date, tasks } = toRefs(props)
const luxonDt = computed(() => DateTime.fromJSDate(date.value))
const relativeDay = computed(() => {
    let str = luxonDt.value.toRelativeCalendar()
    if (str) {
        const firstLetter = str[0].toUpperCase()
        str = firstLetter + str.substring(1)
    }
   
    return str
})
const displayDay = computed(() => luxonDt.value.toFormat('d LLL yy'))
</script>

<template>
    <div>
        <div class="mb-3">
            <p class="text-sm text-gray-700">
                <span class="text-lg font-medium">{{ relativeDay }}</span>
                {{ displayDay }}
            </p>
        </div>
        <div class="todos">
            <TodoItem v-for="task in tasks" :key="task.name" :task="task" />
        </div>
    </div>
</template>

<style scoped>
.todos {
    @apply flex flex-col gap-3;
}
</style>