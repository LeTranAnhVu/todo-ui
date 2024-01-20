import { RepeatableType } from '@/lib/enums/RepeatableType.ts'

export type SubTodoDto = {
    id: string
    name: string
    parentId: string
    repeatableType: RepeatableType
    repeatableStartedAt?: Date
    createdAt: Date
    updatedAt?: Date
}