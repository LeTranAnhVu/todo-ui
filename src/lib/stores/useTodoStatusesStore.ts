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

export function getTodoStatusByDay(todos: TodoDto[] | SubTodoDto[], todoStatuses: TodoStatusDto[], day: Date): DisplayedTodoStatusDto[] {
    const statuses: DisplayedTodoStatusDto[] = []
    for (const todo of todos) {

        // If the todo is available later than the given day,
        //  Or the end day is over
        //  return null
        if (isAfterDateOnly(todo.startDate, day)
            || (todo.endDate && isAfterDateOnly(day, todo.endDate))) {
            continue
        }


        // Find the status of given todo at given day if has
        const currentTodoStatuses: DisplayedTodoStatusDto[] = todoStatuses
            .filter(stt => todo.id === stt.todoId)


        if (todo.repeatableType === RepeatableType.Once) {
            if (currentTodoStatuses.length > 1) {
                console.error('something went wrong, cannot have two status for once', todo.id, todo.name)
                continue
            }

            if (currentTodoStatuses[0]) {
                // add existing one if it is same day or it is not completed yet
                if (isSameDateOnly(currentTodoStatuses[0].occurDate, day) || !currentTodoStatuses[0].isCompleted) {
                    currentTodoStatuses[0].repeatableType = todo.repeatableType
                    statuses.push(currentTodoStatuses[0])
                }

                continue
            }

        } else if (todo.repeatableType === RepeatableType.Daily && currentTodoStatuses.length > 0) {
            const sameDayTodoStatus = currentTodoStatuses.find(stt => isSameDateOnly(stt.occurDate, day))
            if (sameDayTodoStatus) {
                sameDayTodoStatus.repeatableType = todo.repeatableType
                statuses.push(sameDayTodoStatus)
                continue
            }
        }

        const newStatus: DisplayedTodoStatusDto = {
            id: null,
            completedAt: null,
            occurDate: toDateOnly(day),
            createdAt: null,
            updatedAt: null,
            todoName: todo.name,
            todoId: todo.id,
            isCompleted: false,
            repeatableType: todo.repeatableType
        }

        statuses.push(newStatus)
    }

    return statuses
}

export const useTodoStatusesStore = defineStore('todoStatuses', () => {
    const todoStatuses = ref<TodoStatusDto[]>([])
    const isProcessing = ref<'get-all' | 'create' | null>(null)

    function isCompletedTodo(todo: TodoDto): boolean {
        if (todo.repeatableType === RepeatableType.Once
            && todoStatuses.value.some(stt => stt.todoId === todo.id && stt.isCompleted)) {

            return true
        }

        return false
    }

    async function fetchTodoStatuses() {
        isProcessing.value = 'get-all'
        const { data } = await useApiFetch('todoStatuses').get().json<TodoStatusDto[]>()
        todoStatuses.value = data.value || []
        isProcessing.value = null
    }

    async function createTodoStatus(payload: CreateTodoStatusDto) {
        isProcessing.value = 'create'
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

        isProcessing.value = null
    }

    return { todoStatuses, fetchTodoStatuses, createTodoStatus, getTodoStatusByDay, isProcessing, isCompletedTodo }
})

