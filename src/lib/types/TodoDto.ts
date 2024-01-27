import { SubTodoDto } from '@/lib/types/SubTodoDto.ts'
import { RepeatableType } from '@/lib/enums/RepeatableType.ts'

export type TodoDto = {
    id: string
    name: string
    subTodos: SubTodoDto[]
    repeatableType: RepeatableType
    startedAt: Date
    endedAt: Date | null
    createdAt: Date
    updatedAt: Date | null
}