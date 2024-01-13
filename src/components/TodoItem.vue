<script setup lang="ts">
import type { TodoTask } from '@/lib/types/TodoTask.ts'
import { computed, reactive, ref, toRefs } from 'vue'
import Checkbox from '@/components/Checkbox.vue'

type Props = {
    task: TodoTask
}

const props = defineProps<Props>()

// TODO we can refactor this to computed and new value is set to state management
const task = reactive({ ...toRefs(props).task.value })

const subTasks = computed(() => task?.tasks.length || 0)
const completedSubTasks = computed(() => task?.tasks.filter(task => task.isCompleted).length || 0)
const allSubTasksCompleted = computed(() => subTasks.value === completedSubTasks.value)
// Collapsing
const isCollapsed = ref(false)
const handleCollapseTask = () => {
    isCollapsed.value = !isCollapsed.value
}

</script>

<template>
    <div class="task" :data-collapsed="isCollapsed" :data-completed="task.isCompleted">
        <div class="main">
            <div class="left">
                <Checkbox v-model="task.isCompleted" />
                <p class="name">{{ task?.name }}</p>
            </div>
            <div class="right">
                <div class="sub-task-action" @click="handleCollapseTask">
                    <p v-if="subTasks" :class="{'line-through': allSubTasksCompleted}">{{ completedSubTasks
                        }}/{{ subTasks }} tasks</p>
                    <Icon
                        v-if="subTasks"
                        icon="fa-solid fa-angle-left"
                        class="collapsed-icon"
                    ></Icon>
                </div>
            </div>
        </div>
        <div class="collapsed">
            <!--  sub tasks -->
            <ul v-if="task.tasks.length && isCollapsed" class="sub-tasks">
                <li
                    v-for="subTask in task.tasks"
                    :key="`${task.name}-${subTask.name}`"
                    class="task"
                    :data-completed="subTask.isCompleted">
                    <div class="main">
                        <div class="left">
                            <Checkbox v-model="subTask.isCompleted" />
                            <p class="name">{{ subTask.name }}</p>
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
.task {
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

            .sub-task-action {
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

        .sub-tasks {
            @apply flex flex-col gap-3;
        }
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

    &[data-completed="true"] {
        & > .main .left .name {
            @apply line-through;
        }
    }
}
</style>