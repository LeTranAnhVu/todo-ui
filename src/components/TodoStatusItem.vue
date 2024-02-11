<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import Checkbox from '@/components/Checkbox.vue'
import { useTodoStatusesStore } from '@/lib/stores/useTodoStatusesStore.ts'
import { DisplayedTodoStatusDto } from '@/lib/types/DisplayedTodoStatusDto.ts'

type Props = {
    todoStatus: DisplayedTodoStatusDto
    subTodoStatuses: DisplayedTodoStatusDto[]
}

const props = defineProps<Props>()
const { todoStatus, subTodoStatuses } = toRefs<Props>(props)
const todoStatusStore = useTodoStatusesStore()

const completedSubTodos = computed(() => subTodoStatuses.value.filter(stds => stds.isCompleted))
const allSubTodosCompleted = computed(() => subTodoStatuses.value.length === completedSubTodos.value.length)


// Collapsing
const isCollapsed = ref(false)
const handleCollapseTask = () => {
    isCollapsed.value = !isCollapsed.value
}

const updateStatus = async (todoStatus: DisplayedTodoStatusDto | null, newVal: boolean) => {
    await todoStatusStore.createTodoStatus({
        todoId: todoStatus!.todoId,
        isCompleted: newVal,
        occurDate: todoStatus!.occurDate
    })
}

</script>

<template>
    <div
        v-if="todoStatus"
        class="todo"
        :data-collapsed="isCollapsed"
        :data-completed="todoStatus.isCompleted">
        <div class="main">
            <div class="left">
                <Checkbox
                    :model-value="todoStatus.isCompleted"
                    @update:model-value="(newVal: boolean) => updateStatus(todoStatus, newVal)"
                />
                <p class="name">{{ todoStatus.todoName }}</p>
            </div>
            <div class="right">
                <div
                    v-if="subTodoStatuses.length"
                    class="sub-todo-action"
                    @click="handleCollapseTask">
                    <p 
                        v-if="subTodoStatuses" 
                        :class="{'line-through': allSubTodosCompleted}">
                        {{ completedSubTodos.length }}/{{ subTodoStatuses.length }} tasks</p>
                    <Icon
                        v-if="subTodoStatuses.length"
                        icon="fa-solid fa-angle-left"
                        class="collapsed-icon"
                    ></Icon>
                </div>
            </div>
        </div>
        <div class="collapsed">
            <!--  sub tasks -->
            <ul
                v-if="isCollapsed && subTodoStatuses.length"
                class="sub-todos">
                <li
                    v-for="stdStt in subTodoStatuses"
                    :key="stdStt.todoId"
                    class="sub-todo"
                    :data-completed="stdStt.isCompleted">
                    <div class="main">
                        <div class="left">
                            <Checkbox
                                :model-value="stdStt.isCompleted"
                                @update:model-value="(newVal: boolean) => updateStatus(stdStt, newVal)"
                            />

                            <p class="name">{{ stdStt.todoName }}</p>
                        </div>
                        <div class="right">
                            <!-- nothing here -->
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

.todo, .sub-todo {
    &[data-completed="true"] {
        & > .main .left .name {
            @apply line-through;
        }
    }
}

</style>