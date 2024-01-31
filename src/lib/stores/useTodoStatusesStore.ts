import { defineStore } from 'pinia'
import { ref } from 'vue'
import { TodoStatusDto } from '@/lib/types/TodoStatusDto.ts'
import { useApiFetch } from '@/main.ts'
import { isSameDateOnly } from '@/lib/helpers/isSameDateOnly.ts'
import { DisplayedTodoStatusDto } from '@/lib/types/DisplayedTodoStatusDto.ts'
import { TodoDto } from '@/lib/types/TodoDto.ts'
import { SubTodoDto } from '@/lib/types/SubTodoDto.ts'
import { RepeatableType } from '@/lib/enums/RepeatableType.ts'
import { isAfterDateOnly } from '@/lib/helpers/isAfterDateOnly.ts'
import { toDateOnly } from '@/lib/helpers/toDateOnly.ts'
import { DateOnly } from '@/lib/types/DateOnly.ts'

export type CreateTodoStatusDto = {
    todoId: string
    isCompleted: boolean,
    occurDate: DateOnly
}

export const useTodoStatusesStore = defineStore('todoStatuses', () => {
    const todoStatuses = ref<TodoStatusDto[]>([])

    function getTodoStatusByDay(todo: TodoDto | SubTodoDto, day: Date): DisplayedTodoStatusDto | null {
        // If the todo is available later than the given day,
        //  Or the end day is over 
        //  return null
        if (isAfterDateOnly(todo.startDate, day) || (todo.endDate && isAfterDateOnly(day, todo.endDate))) {
            return null
        }

        // Find the status of given todo at given day if has
        const currentDayStatus: DisplayedTodoStatusDto | undefined = todoStatuses.value
            .find(stt => isSameDateOnly(stt.occurDate, day)
                && todo.id === stt.todoId)

        if (currentDayStatus) {
            return currentDayStatus
        }
        
        const newStatus: DisplayedTodoStatusDto = {
            id: null,
            completedAt: null,
            occurDate: toDateOnly(day),
            createdAt: null,
            updatedAt: null,
            todoName: todo.name,
            todoId: todo.id,
            isCompleted: false
        }

        if (todo.repeatableType === RepeatableType.Once
            && !isSameDateOnly(todo.startDate, day)) {
            // don't return status if it is once time and the day is not the repeatable started at
            return null
        }

        return newStatus
    }

    async function fetchTodoStatuses() {
        const { data } = await useApiFetch('todoStatuses').get().json<TodoStatusDto[]>()
        todoStatuses.value = data.value || []
    }

    async function createTodoStatus(payload: CreateTodoStatusDto) {
        const { data } = await useApiFetch('todoStatuses').post(payload).json<TodoStatusDto>()
        if (data.value) {
            const upsertTodoStatus = data.value
            // Find the index of the existing status
            const idx = todoStatuses.value.findIndex(tds => tds.todoId === upsertTodoStatus!.todoId
                && isSameDateOnly(tds.occurDate, upsertTodoStatus!.occurDate))

            if (idx === -1) {
                todoStatuses.value.push(upsertTodoStatus)
            } else {
                todoStatuses.value.splice(idx, 1, upsertTodoStatus)
            }
        }
    }

    return { todoStatuses, fetchTodoStatuses, createTodoStatus, getTodoStatusByDay }
})

