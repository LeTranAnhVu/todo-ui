import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApiFetch } from '@/main.ts'
import { TodoDto } from '@/lib/types/TodoDto.ts'
import { RepeatableType } from '@/lib/enums/RepeatableType.ts'
import { DateOnly } from '@/lib/types/DateOnly.ts'

export type CreateTodoDto = {
    name: string
    subTodos: Omit<CreateTodoDto, 'subTodos' | 'startDate' | 'endDate'>[] | null
    repeatableType: RepeatableType | null
    startDate: DateOnly
    endDate: DateOnly | null
}

export type UpdateTodoDto = {
    name: string
}

export const useTodosStore = defineStore('todos', () => {
    const todos = ref<TodoDto[]>([])

    async function fetchTodos() {
        const { data } = await useApiFetch('todos').get().json<TodoDto[]>()
        todos.value = data.value || []
    }

    async function createTodo(payload: CreateTodoDto) {
        const { data } = await useApiFetch('todos').post(payload).json<TodoDto>()
        if (!data.value) {
            throw Error('empty todo')
        }

        todos.value.unshift(data.value)
    }

    async function updateTodo(id: string, payload: UpdateTodoDto) {
        const { data } = await useApiFetch(`todos/${id}`).put(payload).json<TodoDto>()
        if (!data.value) {
            throw Error('empty todo')
        }
        const idx = todos.value.findIndex(td => td.id === id)
        if (idx !== -1) {
            todos.value.splice(idx, 1, data.value)
        }
    }

    async function deleteTodo(id: string, parentId?: string) {
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
    }

    return { todos, fetchTodos, createTodo, updateTodo, deleteTodo }
})