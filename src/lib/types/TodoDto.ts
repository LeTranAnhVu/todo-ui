import { SubTodoDto } from '@/lib/types/SubTodoDto.ts'
import { RepeatableType } from '@/lib/enums/RepeatableType.ts'
import { DateOnly } from '@/lib/types/DateOnly.ts'

export type TodoDto = {
    id: string
    name: string
    subTodos: SubTodoDto[]
    repeatableType: RepeatableType
    startDate: DateOnly
    endDate: DateOnly | null
    createdAt: Date
    updatedAt: Date | null
}