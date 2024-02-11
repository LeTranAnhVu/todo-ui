<script setup lang="ts">
import DailyTodoStatusList from '@/components/DailyTodoStatusList.vue'
import Spinner from '@/components/Spinner.vue'
import { useTodosStore } from '@/lib/stores/useTodosStore.ts'
import { useTodoStatusesStore } from '@/lib/stores/useTodoStatusesStore.ts'
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import { DATEPICKER_DISPLAY_FORMAT } from '@/lib/constants.ts'


const dateFormatter = {
    date: DATEPICKER_DISPLAY_FORMAT,
    month: 'MMM'
}

const todosStore = useTodosStore()
const todoStatusesStore = useTodoStatusesStore()

const selectedDateInput = ref<string[]>([dayjs().format(DATEPICKER_DISPLAY_FORMAT)])

const selectDateObject = computed(() => new Date(selectedDateInput.value[0]))

const isLoading = computed(() => todosStore.isProcessing === 'get-all' || todoStatusesStore.isProcessing === 'get-all')

// const toggle = ref(true)
</script>

<template>
    <div class="flex flex-col gap-2">
        <template v-if="isLoading">
            <div class="mx-auto mt-10">
                <Spinner />
            </div>
        </template>
        <template v-else>
            <div class="ml-auto w-[150px]">
<!--                <Switch v-model="toggle" label="Show daily tasks" right />-->
                <vue-tailwind-datepicker
                    v-model="selectedDateInput"
                    as-single
                    :formatter="dateFormatter" />
            </div>
            <DailyTodoStatusList :date="selectDateObject" />
        </template>
    </div>
</template>