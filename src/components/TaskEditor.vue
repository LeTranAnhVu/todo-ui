<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import Checkbox from '@/components/Checkbox.vue'
import { computed, reactive, ref, toRefs } from 'vue'
import {
    CreateSubTodoDto,
    CreateTodoDto,
    UpdateTodoDto,
    UpsertNestedSubTodoDto,
    useTodosStore
} from '@/lib/stores/useTodosStore.ts'
import { RepeatableType } from '@/lib/enums/RepeatableType.ts'
import dayjs from 'dayjs'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import Btn from '@/components/Btn.vue'
import { toDateOnly } from '@/lib/helpers/toDateOnly.ts'
import { isAfterDateOnly } from '@/lib/helpers/isAfterDateOnly.ts'
import { DateOnly } from '@/lib/types/DateOnly.ts'
import LoadingCard from '@/pages/LoadingCard.vue'
import { DATEPICKER_DISPLAY_FORMAT } from '@/lib/constants.ts'

export type SubTodoForm = Omit<TodoForm, 'subTodos' | 'startDate' | 'endDate'>
export type TodoForm = {
    id: string | null
    isRepeated: boolean
    name: string
    subTodos: SubTodoForm[]
    startDate: DateOnly | null
    endDate: DateOnly | null
}

export type TaskEditorProps = {
    operation?: 'create' | 'update'
    initialTodoForm?: TodoForm
}

const genTmpId = () => `TMP_${uuidv4()}`
const isTmpId = (id: string) => id.startsWith('TMP_')
const whatIsRepeatableType = (isRepeated: boolean): RepeatableType => isRepeated ? RepeatableType.Daily : RepeatableType.Once

const emits = defineEmits(['done'])
const props = withDefaults(defineProps<TaskEditorProps>(), {
    operation: 'create',
    initialTodoForm: () => ({
        id: null,
        isRepeated: false,
        name: '',
        subTodos: [],
        startDate: null,
        endDate: null
    })
})

const { initialTodoForm, operation } = toRefs(props)

const todoForm = reactive<TodoForm>({ ...initialTodoForm.value })
const startDateField = ref<string[]>(todoForm.startDate ? [dayjs(todoForm.startDate).format(DATEPICKER_DISPLAY_FORMAT)] : [dayjs().format(DATEPICKER_DISPLAY_FORMAT)])
const endDateField = ref<string[]>(todoForm.endDate ? [dayjs(todoForm.endDate).format(DATEPICKER_DISPLAY_FORMAT)] : [])
const isLoading = computed(() => !!useTodosStore().isProcessing)
const handleSetEndDate = () => {
    endDateField.value = [dayjs().add(1, 'day').format(DATEPICKER_DISPLAY_FORMAT)]

}
const dateFormatter = {
    date: DATEPICKER_DISPLAY_FORMAT,
    month: 'MMM'
}

const addNewSubTodo = () => {
    todoForm.subTodos.push({
        id: genTmpId(),
        name: '',
        isRepeated: false
    })
}


const deleteSubTodo = (id: string | null) => {
    const idx = todoForm.subTodos.findIndex(t => t.id === id)
    todoForm.subTodos.splice(idx, 1)
}

const formErrors = reactive<{
    name: [boolean, string],
    startDate: [boolean, string],
    endDate: [boolean, string],
    subTodos: Record<string, [boolean, string]>
}>({
    name: [false, ''],
    startDate: [false, ''],
    endDate: [false, ''],
    subTodos: {}
})

const validate = (): boolean => {
    let isValid = true
    // Name is required
    if (!todoForm.name) {
        formErrors.name = [true, 'Required']
        isValid = false
    } else {
        formErrors.name = [false, '']
    }
    // Start date must define
    if (startDateField.value.length === 0) {
        formErrors.startDate = [true, 'Required']
        isValid = false
    } else {
        formErrors.startDate = [false, '']
    }

    if (todoForm.isRepeated) {
        if (endDateField.value.length !== 0) {
            // End date must be after the start date if it is defined
            if (isAfterDateOnly(startDateField.value[0], endDateField.value[0])) {
                formErrors.endDate = [true, 'End date must be after the start date']
                isValid = false
            } else {
                formErrors.endDate = [false, '']
            }
        } else {
            formErrors.endDate = [false, '']
        }
    } else {
        formErrors.endDate = [false, '']
    }

    // subtasks name are required
    for (const subTodo of todoForm.subTodos) {
        if (!subTodo.name) {
            formErrors.subTodos[subTodo?.id || 'unknown'] = [true, 'Required']
            isValid = false
        } else {
            formErrors.subTodos[subTodo?.id || 'unknown'] = [false, '']
        }
    }

    return isValid
}

const createTodo = async () => {
    if (validate()) {

        const mapSubTodo = (form: SubTodoForm): CreateSubTodoDto => {
            return {
                name: form.name,
                repeatableType: whatIsRepeatableType(form.isRepeated)
            }
        }

        const dto: CreateTodoDto = {
            name: todoForm.name,
            subTodos: todoForm.subTodos.map(mapSubTodo),
            repeatableType: whatIsRepeatableType(todoForm.isRepeated),
            startDate: toDateOnly(startDateField.value[0]),
            endDate: todoForm.isRepeated && endDateField.value.length !== 0 ? toDateOnly(endDateField.value[0]) : null
        }

        const todoStore = useTodosStore()

        await todoStore.createTodo(dto)
        emits('done')
    } else {
        console.error('Validation failed')
    }
}

const updateTodo = async () => {
    if (validate() && todoForm.id && !isTmpId(todoForm.id)) {
        const todoStore = useTodosStore()

        const mapUpsertSubTodo = (subForm: SubTodoForm): UpsertNestedSubTodoDto => ({
            name: subForm.name,
            id: subForm.id && !isTmpId(subForm.id) ? subForm.id : null,
            repeatableType: whatIsRepeatableType(subForm.isRepeated),
            startDate: null, // TODO should let the user select the date later. Set null mean it will follow the parent atm
            endDate: null // TODO
        })
        const dto: UpdateTodoDto = {
            name: todoForm.name,
            subTodos: todoForm.subTodos.map(mapUpsertSubTodo)
        }

        await todoStore.updateTodo(todoForm.id, dto)
        emits('done')
    } else {
        console.error('Validation failed')
    }
}

</script>

<template>
    <LoadingCard :is-loading="isLoading">
        <div class="flex flex-col gap-10">
            <h2 class="text-lg mb-3">Task</h2>
            <div class="card">
                <div class="inputField">
                    <input
                        v-model="todoForm.name"
                        type="text"
                        class="input-text"
                        :data-invalid="formErrors.name[0]">
                    <span
                        v-if="formErrors.name[1]"
                        class="errorMessage">
                    {{ formErrors.name[1] }} </span>
                </div>
                <Checkbox
                    v-model="todoForm.isRepeated"
                    :disabled="operation==='update'"
                    label="Repeat daily:" />
                <div class="inputField">
                    <label class="mb-2">Started at:</label>
                    <vue-tailwind-datepicker
                        v-model="startDateField"
                        :disabled="operation==='update'"
                        as-single
                        :formatter="dateFormatter" />
                    <span
                        v-if="formErrors.startDate[1]"
                        class="errorMessage">
                    {{ formErrors.startDate[1] }} </span>
                </div>

                <template v-if="todoForm.isRepeated">
                    <div class="inputField">
                        <label class="mb-2">Ended at (optional):</label>
                        <Btn
                            v-if="!endDateField.length"
                            variant="secondary"
                            @click="handleSetEndDate"
                        >Set End date
                        </Btn>

                        <vue-tailwind-datepicker
                            v-else
                            v-model="endDateField"
                            :disabled="operation==='update'"
                            as-single
                            :formatter="dateFormatter" />

                        <span
                            v-if="formErrors.endDate[1]"
                            class="errorMessage">
                    {{ formErrors.endDate[1] }} </span>
                    </div>
                </template>
            </div>
            <div class="subTasks">
                <h2 class="text-lg mb-3">Sub tasks</h2>
                <div v-for="subTodo in todoForm.subTodos" :key="subTodo.id || 'unknown'" class="task mb-4">
                    <div class="card">
                        <div class="inputField">
                            <input
                                v-model="subTodo.name"
                                type="text"
                                class="input-text"
                                :data-invalid="!!(formErrors.subTodos[subTodo?.id || 'unknown']?.[0])">
                            <span
                                v-if="formErrors.subTodos[subTodo?.id || 'unknown']?.[1]"
                                class="errorMessage">
                    {{ formErrors.subTodos[subTodo?.id || 'unknown']?.[1] }} </span>
                        </div>
                        <Checkbox
                            v-if="todoForm.isRepeated"
                            v-model="subTodo.isRepeated"
                            :disabled="!!(operation==='update' && subTodo.id && !isTmpId(subTodo.id))"
                            label="Repeat daily:" />

                        <Icon
                            icon="fa-regular fa-circle-xmark"
                            size="lg"
                            class="closeIcon"
                            @click="deleteSubTodo(subTodo?.id)" />
                    </div>
                </div>

                <Btn variant="primary-outline" @click="addNewSubTodo">Add new</Btn>
            </div>
            <div class="divide"></div>
            <div class="formActions">
                <Btn v-if="operation==='create'" variant="primary" @click="createTodo">Create</Btn>
                <Btn v-else-if="operation==='update'" variant="primary" @click="updateTodo">Update</Btn>
            </div>
        </div>

    </LoadingCard>
</template>

<style scoped>
.card {
    @apply flex flex-col gap-4
    rounded-lg ring-black ring-1
    relative p-4;

    .closeIcon {
        @apply text-black
        cursor-pointer
        absolute top-[-10px] right-[-10px] bg-white;
    }
}

.inputField {
    @apply w-full flex flex-col;
}

.input-text {
    @apply
    ring-gray-300 ring-1 rounded
    py-1 px-2;

    &[data-invalid=true] {
        @apply ring-red-400;
    }
}

.errorMessage {
    @apply font-medium tracking-wide text-red-500 text-xs mt-0 ml-1;
}

.divide {
    @apply w-full h-[1px] bg-gray-500;
}
</style>