export type TodoStatusDto = {
    id: string
    todoName: string
    todoId: string
    isCompleted: boolean
    createdAt: Date
    updatedAt: Date | null
    completedAt: Date | null
    occurredAt: Date
}
