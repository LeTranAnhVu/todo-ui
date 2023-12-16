<script setup lang="ts">
import type { TodoItemType } from '@/lib/types/TodoItem.ts'
import { computed, ref, toRefs, watch } from 'vue'
import Checkbox from '@/components/Checkbox.vue'

type Props = {
    item: TodoItemType
}

const props = defineProps<Props>()

const { item } = toRefs(props)
const miniTasks = computed(() => item?.value?.items.length)
const doneMiniTasks = computed(() => item?.value?.items.filter(task => task.isCompleted).length)
const checked = ref(item.value.isCompleted)

</script>

<template>
    <div class="todo">
        <div class="left">
            <Checkbox v-model="checked"/>
            <p class="name" :data-done="checked">{{ item?.name }}</p>
        </div>
        <div class="right">
            <p>{{ doneMiniTasks }}/{{ miniTasks }} tasks</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.todo {
    @apply flex flex-nowrap items-center justify-between
    rounded-lg ring-black ring-1
    px-2 py-1;
    
    .left {
        @apply flex flex-nowrap gap-2 items-center;
        .name[data-done=true] {
            @apply line-through;
        }
    }
    
}
</style>