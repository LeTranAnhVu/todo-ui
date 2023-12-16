<script setup lang="ts">
import type { TodoItemType } from '@/lib/types/TodoItem.ts'
import { computed, reactive, ref, toRefs } from 'vue'
import Checkbox from '@/components/Checkbox.vue'

type Props = {
    item: TodoItemType
}

const props = defineProps<Props>()

// TODO we can refactor this to computed and new value is set to state management
const item = reactive({ ...toRefs(props).item.value })

const miniTasks = computed(() => item?.items.length || 0)
const doneMiniTasks = computed(() => item?.items.filter(task => task.isCompleted).length || 0)

// Collapsing
const isCollapsed = ref(false)
const handleCollapseTask = () => {
    isCollapsed.value = !isCollapsed.value
}

</script>

<template>
    <div class="task" :data-collapsed="isCollapsed" :data-completed="item.isCompleted">
        <div class="main">
            <div class="left">
                <Checkbox v-model="item.isCompleted" />
                <p class="name">{{ item?.name }}</p>
            </div>
            <div class="right">
                <p v-if="miniTasks">{{ doneMiniTasks }}/{{ miniTasks }} tasks</p>
                <Icon
                    v-if="miniTasks"
                    icon="fa-solid fa-angle-left"
                    class="cursor-pointer collapsed-icon"
                    @click="handleCollapseTask"></Icon>
            </div>
        </div>
        <div class="collapsed">
            <!--  mini tasks -->
            <ul v-if="item.items.length && isCollapsed" class="mini-tasks">
                <li v-for="miniTask in item.items" :key="`${item.name}-${miniTask.name}`" class="task"
                    :data-completed="miniTask.isCompleted">
                    <div class="main">
                        <div class="left">
                            <Checkbox v-model="miniTask.isCompleted" />
                            <p class="name">{{ miniTask?.name }}</p>
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

            .collapsed-icon {
                @apply transition-all duration-200 ease-in-out;
            }
        }
    }

    .collapsed {
        @apply h-0 invisible
        transition-all duration-200 ease-in-out;

        .mini-tasks {
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