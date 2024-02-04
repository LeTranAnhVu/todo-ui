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

const handleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
}

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
                <Icon icon="fa-solid fa-pen"></Icon>
            </div>
            <div class="right">
                <div
                    v-if="subItems.length"
                    class="sub-todo-action"
                    @click="handleCollapse">
                    <p v-if="subItems.length">{{ subItems.length }} tasks</p>
                    <Icon icon="fa-solid fa-angle-left" class="collapsed-icon"></Icon>
                </div>
                <div class="ml-2">
                    <Icon icon="fa-solid fa-trash" @click="() => deleteItem(item.id)"/>
                </div>
            </div>
        </div>
        <div class="collapsed">
            <!--  sub tasks -->
            <ul
                v-if="isCollapsed && subItems.length"
                class="sub-todos">
                <li
                    v-for="subItem in subItems"
                    :key="subItem.id"
                    class="sub-todo">
                    <div class="main">
                        <div class="left">
                            <p class="name">{{ subItem.name }}</p>
                            <Icon class="ml-3" icon="fa-solid fa-pen"></Icon>
                        </div>
                        <div class="right">
                            <div class="ml-2">
                                <Icon icon="fa-solid fa-trash" @click="() => deleteItem(subItem.id, item.id)"/>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
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