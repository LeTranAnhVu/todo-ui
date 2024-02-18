<script setup lang="ts">
import TodoStatusItem from '@/components/TodoStatusItem.vue'
import { computed, toRefs } from 'vue'
import { useTodosStore } from '@/lib/stores/useTodosStore.ts'
import { getTodoStatusByDay, useTodoStatusesStore } from '@/lib/stores/useTodoStatusesStore.ts'
import { DisplayedTodoStatusDto } from '@/lib/types/DisplayedTodoStatusDto.ts'

type Props = {
    date: Date
}

const props = defineProps<Props>()
const { date } = toRefs(props)
// const luxonDt = computed(() => DateTime.fromJSDate(date.value))
// const relativeDay = computed(() => {
//     let str = luxonDt.value.toRelativeCalendar()
//     if (str) {
//         const firstLetter = str[0].toUpperCase()
//         str = firstLetter + str.substring(1)
//     }
//
//     return str
// })

// const displayDay = computed(() => luxonDt.value.toFormat('d LLL yy'))
const todos = useTodosStore().todos

const todoStatusStore = useTodoStatusesStore()
const todoStatuses = computed(() => {
    return getTodoStatusByDay(todos,todoStatusStore.todoStatuses, date.value)
})
const subTodoStatuses = computed(() => {
    const obj: Record<string, DisplayedTodoStatusDto[]> = {}
    for (const todo of todos) {
       if(!todo.subTodos.length) {
           continue
       }

       obj[todo.id] = getTodoStatusByDay(todo.subTodos, todoStatusStore.todoStatuses, date.value)
    }

    return obj
})

</script>

<template>
    <div>
<!--        <div class="mb-3">-->
<!--            <p class="text-sm text-gray-700">-->
<!--                <span class="text-lg font-medium">{{ relativeDay }}</span>-->
<!--                {{ displayDay }}-->
<!--            </p>-->
<!--        </div>-->
        <div class="todos">
            <TodoStatusItem
                v-for="todoStatus in todoStatuses"
                :key="todoStatus.todoId || ''"
                :todo-status="todoStatus"
                :sub-todo-statuses="subTodoStatuses[todoStatus.todoId || ''] || []"
            />
        </div>
    </div>
</template>

<style scoped>
.todos {
    @apply flex flex-col gap-3;
}
</style>