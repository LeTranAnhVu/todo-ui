<script setup lang="ts">

import { TodoDto } from '@/lib/types/TodoDto.ts'
import { computed, defineAsyncComponent, toRefs } from 'vue'
import { useTodosStore } from '@/lib/stores/useTodosStore.ts'
import useAppStore from '@/lib/stores/useAppStore.ts'
import { SubTodoForm, TaskEditorProps } from '@/components/TaskEditor.vue'
import { RepeatableType } from '@/lib/enums/RepeatableType.ts'
import { SubTodoDto } from '@/lib/types/SubTodoDto.ts'
import { useTodoStatusesStore } from '@/lib/stores/useTodoStatusesStore.ts'

type Props = {
    item: TodoDto
}

const props = defineProps<Props>()
const { item } = toRefs(props)
const subItems = item.value.subTodos

const todoStore = useTodosStore()
const todoStatusStore = useTodoStatusesStore()

const isCompleted = computed(() => todoStatusStore.isCompletedTodo(item.value))
const deleteItem = async (id: string, parentId?: string) => {
    const confirm = window.confirm('Do you want to delete it?')
    if (confirm) {
        await todoStore.deleteTodo(id, parentId)
    }
}

const openDrawer = (item: TodoDto) => {
    const appStore = useAppStore()
    appStore.bottomDrawer.isOpened = true
    appStore.bottomDrawer.component = defineAsyncComponent(() => import('@/components/TaskEditor.vue'))
    const subMapping = (sub: SubTodoDto): SubTodoForm => {
       return {
           id: sub.id,
           name: sub.name,
           isRepeated: sub.repeatableType !== RepeatableType.Once
       }
    }

    appStore.bottomDrawer.props = {
        operation: 'update',
        initialTodoForm: {
            id: item.id,
            name: item.name,
            startDate: item.startDate,
            endDate: item.endDate,
            isRepeated: item.repeatableType !== RepeatableType.Once,
            subTodos: item.subTodos.map(subMapping)
        }
    } as TaskEditorProps
}
</script>

<template>
    <div
        v-if="item"
        class="todo">
        <div class="main">
            <div class="left">
                <p class="name">{{ item.name }} <span class="italic text-gray-400">{{isCompleted ? 'completed' : ''}}</span></p>
                <p class="badge">{{item.repeatableType}}</p>
                <p v-if="subItems.length" class="font-light italic">({{ subItems.length }} tasks)</p>
            </div>
            <div class="right">
                <div class="flex gap-3">
                    <Icon icon="fa-solid fa-pen" @click="() => openDrawer(item)"></Icon>
                    <Icon icon="fa-solid fa-trash" @click="() => deleteItem(item.id)" />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.todo {
    @apply flex flex-col
    rounded-lg ring-black ring-1
    relative
    px-2 py-2
    transition-all duration-200 ease-in-out;

    .main {
        @apply flex flex-nowrap items-center justify-between grow;

        .left {
            @apply flex flex-nowrap gap-2 items-center;
        }

        .right {
            @apply flex flex-nowrap gap-2 items-center;

        }
    }
}

.badge {
    @apply text-xs rounded ring-black ring-1 px-1 italic opacity-30;
}
</style>