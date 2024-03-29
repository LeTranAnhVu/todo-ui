import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApiFetch } from '@/main.ts'
import { TodoDto } from '@/lib/types/TodoDto.ts'
import { RepeatableType } from '@/lib/enums/RepeatableType.ts'
import { DateOnly } from '@/lib/types/DateOnly.ts'
import useToastStore from '@/features/useToastStore.ts'

export type CreateSubTodoDto = Omit<CreateTodoDto, 'subTodos' | 'startDate' | 'endDate'>

export type CreateTodoDto = {
    name: string
    subTodos: CreateSubTodoDto[] | null
    repeatableType: RepeatableType | null
    startDate: DateOnly
    endDate: DateOnly | null
}

export type UpsertNestedSubTodoDto = {
    name: string
    id: string | null
    repeatableType: RepeatableType | null
    startDate: DateOnly | null
    endDate: DateOnly | null
}

export type UpdateTodoDto = {
    name: string
    subTodos: UpsertNestedSubTodoDto[]
}

export const useTodosStore = defineStore('todos', () => {
    const todos = ref<TodoDto[]>([])
    const isProcessing = ref<'get-all' | 'create' | 'update' | 'delete' | null>(null)
    const toastStore = useToastStore()

    async function fetchTodos() {
        isProcessing.value = 'get-all'
        const { data } = await useApiFetch('todos').get().json<TodoDto[]>()
        todos.value = data.value || []
        isProcessing.value = null
    }

    async function createTodo(payload: CreateTodoDto) {
        isProcessing.value = 'create'

        const { data } = await useApiFetch('todos').post(payload).json<TodoDto>()
        if (!data.value) {
            toastStore.addFeed('error', 'Create failed!')
            throw Error('empty todo')
        }

        todos.value.unshift(data.value)
        isProcessing.value = null

        toastStore.addFeed('success', 'Created successful!')
    }

    async function updateTodo(id: string, payload: UpdateTodoDto) {
        isProcessing.value = 'update'
        const { data } = await useApiFetch(`todos/${id}`).put(payload).json<TodoDto>()
        if (!data.value) {
            toastStore.addFeed('error', 'Update failed!')
            throw Error('empty todo')
        }
        const idx = todos.value.findIndex(td => td.id === id)
        if (idx !== -1) {
            todos.value.splice(idx, 1, data.value)
        }
        isProcessing.value = null
        toastStore.addFeed('success', 'Updated successful!')

    }

    async function deleteTodo(id: string, parentId?: string) {
        isProcessing.value = 'delete'
        try {
            await useApiFetch(`todos/${id}`).delete()
            if (parentId) {
                // find the sub item
                todos.value.forEach(todo => {
                    if (todo.id === parentId) {
                        const idx = todo.subTodos?.findIndex(td => td.id === id)
                        if (idx !== -1) {
                            todo.subTodos.splice(idx, 1)
                        }
                    }
                })
            } else {
                const idx = todos.value.findIndex(td => td.id === id)
                if (idx !== -1) {
                    todos.value.splice(idx, 1)
                }
            }

            isProcessing.value = null
            toastStore.addFeed('success', 'Deleted successful!')

        } catch (e) {
            toastStore.addFeed('error', 'Delete failed!')
        }

    }

    return { todos, fetchTodos, createTodo, updateTodo, deleteTodo, isProcessing }
})