import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApiFetch } from '@/main.ts'
import { TodoDto } from '@/lib/types/TodoDto.ts'
import { RepeatableType } from '@/lib/enums/RepeatableType.ts'
import { SubTodoDto } from '@/lib/types/SubTodoDto.ts'

export type CreateTodoDto = {
    name: string
    subTodos: Omit<CreateTodoDto, 'subTodos'>[] | null
    RepeatableType: RepeatableType | null
}

export type UpdateTodoDto = {
    name: string
}

function mapSubTodo(subTodo: SubTodoDto): SubTodoDto {
    return {
        ...subTodo,
        createdAt: new Date(subTodo.createdAt),
        updatedAt: subTodo.updatedAt ? new Date(subTodo.updatedAt) : subTodo.updatedAt,
        startedAt: new Date(subTodo.startedAt)
    }
}

function mapTodo(todo: TodoDto): TodoDto {
    const subTodos = todo.subTodos.map(std => mapSubTodo(std))
    return {
        ...todo,
        subTodos: subTodos,
        createdAt: new Date(todo.createdAt),
        updatedAt: todo.updatedAt ? new Date(todo.updatedAt) : todo.updatedAt,
        startedAt: new Date(todo.startedAt)
    }
}

export const useTodosStore = defineStore('todos', () => {
    const todos = ref<TodoDto[]>([])

    async function fetchTodos() {
        const { data } = await useApiFetch('todos').get().json<TodoDto[]>()
        data.value = !data.value ? data.value : data.value.map(mapTodo)
        todos.value = data.value || []
    }

    async function createTodo(payload: CreateTodoDto) {
        const { data } = await useApiFetch('todos').post(payload).json<TodoDto>()
        if (!data.value) {
            throw Error('empty todo')
        }

        todos.value.unshift(mapTodo(data.value))
    }

    async function updateTodo(id: string, payload: UpdateTodoDto) {
        const { data } = await useApiFetch(`todos/${id}`).put(payload).json<TodoDto>()
        if (!data.value) {
            throw Error('empty todo')
        }
        const idx = todos.value.findIndex(td => td.id === id)
        if (idx !== -1) {
            todos.value.splice(idx, 1, mapTodo(data.value))
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