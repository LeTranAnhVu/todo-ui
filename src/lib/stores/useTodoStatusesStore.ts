import { defineStore } from 'pinia'
import { ref } from 'vue'
import { TodoStatusDto } from '@/lib/types/TodoStatusDto.ts'
import { useApiFetch } from '@/main.ts'
import { isSameDay } from '@/lib/helpers/isSameDay.ts'
import { DisplayedTodoStatusDto } from '@/lib/types/DisplayedTodoStatusDto.ts'
import { TodoDto } from '@/lib/types/TodoDto.ts'
import { SubTodoDto } from '@/lib/types/SubTodoDto.ts'
import { RepeatableType } from '@/lib/enums/RepeatableType.ts'

export type CreateTodoStatusDto = {
    todoId: string
    isCompleted: boolean,
    occurredAt: Date
}

function mapTodoStatus(todoStatus: TodoStatusDto): TodoStatusDto {
    return {
        ...todoStatus,
        createdAt: new Date(todoStatus.createdAt),
        updatedAt: todoStatus.updatedAt ? new Date(todoStatus.updatedAt) : todoStatus.updatedAt,
        occurredAt: new Date(todoStatus.occurredAt),
        completedAt: todoStatus.completedAt ? new Date(todoStatus.completedAt) : todoStatus.completedAt
    }
}

export const useTodoStatusesStore = defineStore('todoStatuses', () => {
    const todoStatuses = ref<TodoStatusDto[]>([])

    function getTodoStatusByDay(todo: TodoDto | SubTodoDto, day: Date): DisplayedTodoStatusDto | null {
        if (todo.repeatableStartedAt > day) {
            // If the todo is available later than the given day, return null
            return null
        }

        // Find the status of given todo at given day if has
        const currentDayStatus: DisplayedTodoStatusDto | undefined = todoStatuses.value.find(stt => isSameDay(stt.occurredAt, day)
            && todo.id === stt.todoId)

        if (currentDayStatus) {
            return currentDayStatus
        }

        const newStatus: DisplayedTodoStatusDto = {
            id: null,
            completedAt: null,
            occurredAt: day,
            createdAt: null,
            updatedAt: null,
            todoName: todo.name,
            todoId: todo.id,
            isCompleted: false
        }

        if (todo.repeatableType === RepeatableType.Once
            && !isSameDay(todo.repeatableStartedAt, day)) {
            // don't return status if it is once time and the day is not the repeatable started at
            return null
        }
       
        return newStatus
    }

    async function fetchTodoStatuses() {
        const { data } = await useApiFetch('todoStatuses').get().json<TodoStatusDto[]>()
        data.value = !data.value ? data.value : data.value.map(mapTodoStatus)
        todoStatuses.value = data.value || []
    }

    async function createTodoStatus(payload: CreateTodoStatusDto) {
        const { data } = await useApiFetch('todoStatuses').post(payload).json<TodoStatusDto>()
        if (data.value) {
            const upsertTodoStatus = mapTodoStatus(data.value)
            // Find the index of the existing status
            const idx = todoStatuses.value.findIndex(tds => tds.todoId === upsertTodoStatus!.todoId
                && isSameDay(tds.occurredAt, upsertTodoStatus!.occurredAt))

            if (idx === -1) {
                todoStatuses.value.push(upsertTodoStatus)
            } else {
                todoStatuses.value.splice(idx, 1, upsertTodoStatus)
            }
        }
    }

    return { todoStatuses, fetchTodoStatuses, createTodoStatus, getTodoStatusByDay }
})

