import { TodoDto } from '@/lib/types/TodoDto.ts'

export type SubTodoDto = Omit<TodoDto, 'subTodos'> & {
    parentId: string
}