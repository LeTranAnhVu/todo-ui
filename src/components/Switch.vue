<script setup lang="ts">

import { ref, toRefs } from 'vue'

type Props = {
    // checked: boolean
    modelValue: boolean
    label?: string
    disabled?: boolean
    right?: boolean
}

defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    right: false

})

const { modelValue, label, disabled } = toRefs(props)
const input = ref<HTMLInputElement | null>(null)

</script>

<template>
    <label
        class="relative inline-flex items-center cursor-pointer gap-2 "
        :class="{'flex-row-reverse' : right}">
        <div class="relative">
            <input
                ref="input"
                type="checkbox"
                :checked="modelValue"
                :disabled="disabled"
                class="sr-only peer"
                @input="$emit('update:modelValue',  ($event.target as HTMLInputElement).checked)">
            <div
                class="w-11 h-6 bg-gray-200 peer-disabled:opacity-50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
        </div>
        <span v-if="label" class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{ label }}</span>
    </label>
</template>

<style scoped>
</style>