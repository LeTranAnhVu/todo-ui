<script setup lang="ts">

import { TodoDto } from '@/lib/types/TodoDto.ts'
import { ref, toRefs } from 'vue'
import { useTodosStore } from '@/lib/stores/useTodosStore.ts'

type Props = {
    item: TodoDto
}

const props = defineProps<Props>()
const { item } = toRefs(props)
const isCollapsed = ref(false)
const subItems = item.value.subTodos

const todoStore = useTodosStore()

const deleteItem = async (id: string, parentId?: string) => {
    const confirm = window.confirm('Do you want to delete it?')
    if (confirm) {
        await todoStore.deleteTodo(id, parentId)
    }
}
</script>

<template>
    <div
        v-if="item"
        class="todo"
        :data-collapsed="isCollapsed">
        <div class="main">
            <div class="left">
                <p class="name">{{ item.name }}</p>
                <p v-if="subItems.length" class="font-light italic">({{ subItems.length }} tasks)</p>
            </div>
            <div class="right">

                <div class="flex gap-3">
                    <Icon icon="fa-solid fa-pen"></Icon>
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
    px-2 py-1
    transition-all duration-200 ease-in-out;

    .main {
        @apply flex flex-nowrap items-center justify-between grow;

        .left {
            @apply flex flex-nowrap gap-2 items-center;
        }

        .right {
            @apply flex flex-nowrap gap-2 items-center;

            .sub-todo-action {
                @apply flex flex-nowrap gap-2 items-center cursor-pointer;

                .collapsed-icon {
                    @apply transition-all duration-200 ease-in-out;
                }
            }
        }
    }

    .collapsed {
        @apply h-0 invisible
        transition-all duration-200 ease-in-out;
    }

    &[data-collapsed=true] {
        .collapsed {
            @apply mt-5 h-fit visible;
        }

        .right {
            .collapsed-icon {
                @apply -rotate-90;
            }
        }
    }


}

.sub-todos {
    @apply flex flex-col gap-3 pl-3;
    .sub-todo {
        @apply
        pb-3
        border-b last:border-b-0;
    }
}

</style>