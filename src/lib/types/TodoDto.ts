import { SubTodoDto } from '@/lib/types/SubTodoDto.ts'
import { RepeatableType } from '@/lib/enums/RepeatableType.ts'

export type TodoDto = {
    id: string
    name: string
    subTodos: SubTodoDto[]
    repeatableType: RepeatableType
    repeatableStartedAt?: Date
    createdAt: Date
    updatedAt?: Date
}