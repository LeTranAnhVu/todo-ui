import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApiFetch } from '@/main.ts'
import { TodoDto } from '@/lib/types/TodoDto.ts'
import { RepeatableType } from '@/lib/enums/RepeatableType.ts'

export type CreateTodoDto = {
    name: string
    subTodos: Omit<CreateTodoDto, 'subTodos'>[] | null
    RepeatableType: RepeatableType | null
}

export type UpdateTodoDto = {
    name: string
}

export const useTodosStore = defineStore('todos', () => {
    const todos = ref<TodoDto[]>([])

    async function fetchTodos() {
        const { data } = await useApiFetch<TodoDto[]>('todos').get().json()
        todos.value = data.value || []
    }

    async function createTodo(payload: CreateTodoDto) {
        const { data } = await useApiFetch<TodoDto>('todos').post(payload).json()
        if (!data.value) {
            throw Error('empty todo')
        }
        todos.value.unshift(data.value)
    }

    async function updateTodo(id: string, payload: UpdateTodoDto) {
        const { data } = await useApiFetch<TodoDto>(`todos/${id}`).put(payload).json()
        if (!data.value) {
            throw Error('empty todo')
        }
        const idx = todos.value.findIndex(td => td.id === id)
        if (idx !== -1) {
            todos.value.splice(idx, 1, data.value)
        }
    }

    async function deleteTodo(id: string) {
        await useApiFetch(`todos/${id}`).delete()
        const idx = todos.value.findIndex(td => td.id === id)
        if (idx !== -1) {
            todos.value.splice(idx, 1)
        }
    }

    return { todos, fetchTodos, createTodo, updateTodo, deleteTodo }
})