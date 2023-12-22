export type TodoTask = {
    id?: string
    isCompleted: boolean
    tasks: TodoTask[]
    name: string
}