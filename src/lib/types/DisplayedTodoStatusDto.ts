import { Override } from '@/lib/types/Override.ts'
import { TodoStatusDto } from '@/lib/types/TodoStatusDto.ts'
import { RepeatableType } from '@/lib/enums/RepeatableType.ts'

export type DisplayedTodoStatusDto = Override<TodoStatusDto, {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
    repeatableType?: RepeatableType
}>