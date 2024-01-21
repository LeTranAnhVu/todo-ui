<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue'
import { computed, toRefs } from 'vue'
import { DateTime } from 'luxon'
import { useTodosStore } from '@/lib/stores/useTodosStore.ts'

type Props = {
    date: Date
}

const props = defineProps<Props>()

const { date } = toRefs(props)
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

const todos = useTodosStore().todos

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
            <TodoItem v-for="todo in todos" :key="todo.id" :date="date" :todo="todo" />
        </div>
    </div>
</template>

<style scoped>
.todos {
    @apply flex flex-col gap-3;
}
</style>