<script setup lang="ts">
import DailyTodoStatusList from '@/components/DailyTodoStatusList.vue'
import Spinner from '@/components/Spinner.vue'
import { useTodosStore } from '@/lib/stores/useTodosStore.ts'
import { useTodoStatusesStore } from '@/lib/stores/useTodoStatusesStore.ts'
import { computed, defineAsyncComponent, ref } from 'vue'
import dayjs from 'dayjs'
import { DATEPICKER_DISPLAY_FORMAT } from '@/lib/constants.ts'
import Btn from '@/components/Btn.vue'
import useAppStore from '@/lib/stores/useAppStore.ts'


const dateFormatter = {
    date: DATEPICKER_DISPLAY_FORMAT,
    month: 'MMM'
}

const todosStore = useTodosStore()
const todoStatusesStore = useTodoStatusesStore()

const selectedDateInput = ref<string[]>([dayjs().format(DATEPICKER_DISPLAY_FORMAT)])

const selectDateObject = computed(() => new Date(selectedDateInput.value[0]))

const isLoading = computed(() => todosStore.isProcessing === 'get-all' || todoStatusesStore.isProcessing === 'get-all')

const openNewTaskDrawer = () => {
    const appStore = useAppStore()
    appStore.bottomDrawer.isOpened = true
    appStore.bottomDrawer.component = defineAsyncComponent(() => import('@/components/TaskEditor.vue'))
}

</script>

<template>
    <div class="flex flex-col gap-2">
        <template v-if="isLoading">
            <div class="mx-auto mt-10">
                <Spinner />
            </div>
        </template>
        <template v-else>
            <div class="flex flex-nowrap items-center justify-between">
                <div class="w-[70px]">
                    <Btn variant="primary-outline" size="sm" @click="openNewTaskDrawer">New +</Btn>
                </div>
                <div class="w-[170px]">
                    <vue-tailwind-datepicker
                        v-model="selectedDateInput"
                        as-single
                        :formatter="dateFormatter" />
                </div>
            </div>
            <DailyTodoStatusList :date="selectDateObject" />
        </template>
    </div>
</template>