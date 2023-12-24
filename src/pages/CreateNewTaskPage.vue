<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import Checkbox from '@/components/Checkbox.vue'
import { reactive } from 'vue'

type CreateSubTask = {
    id?: string
    isRepeated: boolean
    name: string 
}

type CreateNewTask = CreateSubTask & {
    tasks: CreateSubTask[]
}
const taskForm = reactive<CreateNewTask>({
    name: '',
    isRepeated: false,
    tasks: [],
})

const addNewSubTask = () => {
    taskForm.tasks.push({
        id: `TMP_${uuidv4()}`,
        name: '',
        isRepeated: false,
    })
}

const deleteSubTask = (id?: string) => {
    const idx = taskForm.tasks.findIndex(t => t.id === id)
    taskForm.tasks.splice(idx, 1)
}

const formErrors = reactive<{name: [boolean, string], tasks: Record<string, [boolean, string]>}>({
    name: [false, ''],
    tasks: {}
})

const validate = (): boolean => {
    let isvalid = true
    // Name is required
    if (!taskForm.name) {
        formErrors.name = [true, 'Required']
        isvalid = false
    } else {
        formErrors.name = [false, '']
    }

    // subtasks name are required
    for (const subTask of taskForm.tasks) {
        if (!subTask.name) {
            formErrors.tasks[subTask?.id || 'unknown'] = [true, 'Required']
            isvalid = false
        } else {
            formErrors.tasks[subTask?.id || 'unknown']  = [false, '']
        }
    }

    return isvalid
}
const createTask = () => {
    if (validate()) {
        console.log('submitted', taskForm)
    }
}
</script>

<template>
    <div class="flex flex-col gap-10">
        <div>
            <h2 class="text-lg mb-3">Task</h2>
            <div class="card">
                <div class="inputField">
                    <input v-model="taskForm.name" type="text" class="input-text" :data-invalid="formErrors.name[0]">
                    <span
                        v-if="formErrors.name[1]"
                        class="errorMessage">
                    {{ formErrors.name[1] }} </span>
                </div>
                <Checkbox
                    v-model="taskForm.isRepeated"
                    label="Repeat daily:" />
                <!--    <PrimaryBtn>Click me</PrimaryBtn>-->
                <!--    <SecondaryBtn>Cancel</SecondaryBtn>-->
            </div>
        </div>

        <div class="subTasks">
            <h2 class="text-lg mb-3">Sub tasks</h2>
            <div v-for="subTask in taskForm.tasks" :key="subTask.id" class="task mb-4">
                <div class="card">
                    <div class="inputField">
                        <input
                            v-model="subTask.name" type="text" class="input-text"
                            :data-invalid="!!(formErrors.tasks[subTask?.id || 'unknown']?.[0])">
                        <span
                            v-if="formErrors.tasks[subTask?.id || 'unknown']?.[1]"
                            class="errorMessage">
                    {{ formErrors.tasks[subTask?.id || 'unknown']?.[1] }} </span>
                    </div>
                    <Checkbox
                        v-model="subTask.isRepeated"
                        label="Repeat daily:" />

                    <Icon icon="fa-regular fa-circle-xmark" size="lg" class="closeIcon"
                          @click="deleteSubTask(subTask?.id)" />
                </div>
            </div>

            <Btn variant="primary-outline" @click="addNewSubTask">Add new</Btn>
        </div>
        <div class="divide"></div>
        <div class="formActions">
            <Btn variant="primary" @click="createTask">Create</Btn>
        </div>

    </div>

</template>

<style scoped>
.card {
    @apply flex flex-col gap-4
    rounded-lg ring-black ring-1
    relative p-4;

    .closeIcon {
        @apply text-red-400
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