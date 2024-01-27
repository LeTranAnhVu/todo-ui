<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import Checkbox from '@/components/Checkbox.vue'
import { reactive, ref, watch } from 'vue'
import { CreateTodoDto, useTodosStore } from '@/lib/stores/useTodosStore.ts'
import { RepeatableType } from '@/lib/enums/RepeatableType.ts'

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

const formErrors = reactive<{ name: [boolean, string], subTodos: Record<string, [boolean, string]> }>({
    name: [false, ''],
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
                RepeatableType: form.isRepeated ? RepeatableType.Daily : RepeatableType.Once
            }
        }

        const dto: CreateTodoDto = {
            name: createTodoForm.name,
            subTodos: createTodoForm.subTodos.map(mapSubTodo),
            RepeatableType: createTodoForm.isRepeated ? RepeatableType.Daily : RepeatableType.Once
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
    ring-black ring-1 rounded
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