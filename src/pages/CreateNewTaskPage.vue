<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import Checkbox from '@/components/Checkbox.vue'
import { reactive, ref, watch } from 'vue'
import { CreateTodoDto, useTodosStore } from '@/lib/stores/useTodosStore.ts'
import { RepeatableType } from '@/lib/enums/RepeatableType.ts'
import dayjs from 'dayjs'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import Btn from '@/components/Btn.vue'

type CreateTodoForm = {
    id?: string
    isRepeated: boolean
    name: string
    subTodos: Omit<CreateTodoForm, 'subTodos'>[]
}

const createTodoForm = reactive<CreateTodoForm>({
    name: '',
    isRepeated: false,
    subTodos: []
})

const recentTodoRepeatType = ref<boolean>(createTodoForm.isRepeated)
watch(() => createTodoForm.isRepeated, (newVal) => {
    recentTodoRepeatType.value = newVal
})

const handleSetEndDate = () => {
    endDate.value = [dayjs().add(1, 'day').format(dateFormat)]
}

const dateFormat = 'DD MMM YYYY'
const parseUTCDate = (dateAsStr: string): Date => {
    const dayjsDate = dayjs(dateAsStr)
    return new Date(Date.UTC(dayjsDate.get('year'), dayjsDate.get('month'), dayjsDate.get('date')))
}
const startDate = ref<string[]>([dayjs().format(dateFormat)])
const endDate = ref<string[]>([])
const dateFormatter = {
    date: dateFormat,
    month: 'MMM'
}
const addNewSubTodo = () => {
    createTodoForm.subTodos.push({
        id: `TMP_${uuidv4()}`,
        name: '',
        isRepeated: recentTodoRepeatType.value
    })
}

const deleteSubTodo = (id?: string) => {
    const idx = createTodoForm.subTodos.findIndex(t => t.id === id)
    createTodoForm.subTodos.splice(idx, 1)
}

const formErrors = reactive<{
    name: [boolean, string],
    startedAt: [boolean, string],
    endedAt: [boolean, string],
    subTodos: Record<string, [boolean, string]>
}>({
    name: [false, ''],
    startedAt: [false, ''],
    endedAt: [false, ''],
    subTodos: {}
})

const validate = (): boolean => {
    let isValid = true
    // Name is required
    if (!createTodoForm.name) {
        formErrors.name = [true, 'Required']
        isValid = false
    } else {
        formErrors.name = [false, '']
    }

    if (createTodoForm.isRepeated) {
        // Start date must define
        if (startDate.value.length === 0) {
            formErrors.startedAt = [true, 'Required']
            isValid = false
        } else {
            formErrors.startedAt = [false, '']
        }

        if (startDate.value.length !== 0 && endDate.value.length !== 0) {
            // End date must be after the start date if it is defined
            if (dayjs(endDate.value[0]).isBefore(startDate.value[0])) {
                formErrors.endedAt = [true, 'End date must be after the start date']
                isValid = false
            } else {
                formErrors.endedAt = [false, '']
            }
        } else {
            formErrors.endedAt = [false, '']
        }
    } else {
        formErrors.startedAt = [false, '']
        formErrors.endedAt = [false, '']
    }

    // subtasks name are required
    for (const subTodo of createTodoForm.subTodos) {
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
        const mapSubTodo = (form: Omit<CreateTodoForm, 'subTodos'>): Omit<CreateTodoDto, 'subTodos'> => {
            return {
                name: form.name,
                repeatableType: form.isRepeated ? RepeatableType.Daily : RepeatableType.Once,
                startedAt: form.isRepeated ? parseUTCDate(startDate.value[0]) : null,
                endedAt: form.isRepeated && endDate.value.length !== 0 ? parseUTCDate(endDate.value[0]) : null
            }
        }

        const dto: CreateTodoDto = {
            name: createTodoForm.name,
            subTodos: createTodoForm.subTodos.map(mapSubTodo),
            repeatableType: createTodoForm.isRepeated ? RepeatableType.Daily : RepeatableType.Once,
            startedAt: createTodoForm.isRepeated ? parseUTCDate(startDate.value[0]) : null,
            endedAt: createTodoForm.isRepeated && endDate.value.length !== 0 ? parseUTCDate(endDate.value[0]) : null
        }

        const todoStore = useTodosStore()
        await todoStore.createTodo(dto)
    }
}
</script>

<template>
    <div class="flex flex-col gap-10">
        <div>
            <h2 class="text-lg mb-3">Task</h2>
            <div class="card">
                <div class="inputField">
                    <input
                        v-model="createTodoForm.name"
                        type="text"
                        class="input-text"
                        :data-invalid="formErrors.name[0]">
                    <span
                        v-if="formErrors.name[1]"
                        class="errorMessage">
                    {{ formErrors.name[1] }} </span>
                </div>
                <Checkbox
                    v-model="createTodoForm.isRepeated"
                    label="Repeat daily:" />

                <template v-if="createTodoForm.isRepeated">
                    <div class="inputField">
                        <label class="mb-2">Started at:</label>
                        <vue-tailwind-datepicker
                            v-model="startDate"
                            as-single
                            :formatter="dateFormatter" />

                        <span
                            v-if="formErrors.startedAt[1]"
                            class="errorMessage">
                    {{ formErrors.startedAt[1] }} </span>
                    </div>


                    <div class="inputField">
                        <label class="mb-2">Ended at (optional):</label>
                        <Btn
                            v-if="!endDate.length"
                            variant="secondary"
                            @click="handleSetEndDate"
                        >Set End date
                        </Btn>

                        <vue-tailwind-datepicker
                            v-else
                            v-model="endDate"
                            as-single
                            :formatter="dateFormatter" />

                        <span
                            v-if="formErrors.endedAt[1]"
                            class="errorMessage">
                    {{ formErrors.endedAt[1] }} </span>
                    </div>
                </template>
            </div>
        </div>

        <div class="subTasks">
            <h2 class="text-lg mb-3">Sub tasks</h2>
            <div v-for="subTodo in createTodoForm.subTodos" :key="subTodo.id" class="task mb-4">
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
                        v-model="subTodo.isRepeated"
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
            <Btn variant="primary" @click="createTodo">Create</Btn>
        </div>

    </div>

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