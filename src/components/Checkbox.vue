<script setup lang="ts">
import { ref, toRefs } from 'vue'

type Props = {
    // checked: boolean
    modelValue: boolean
    label?: string
    disabled?: boolean
}

defineEmits(['update:modelValue'])
const formatBoolean = (value: string) => value === 'true'
const props = withDefaults(defineProps<Props>(), {
    disabled: false
})

const { modelValue, label, disabled } = toRefs(props)
const input = ref<HTMLInputElement | null>(null)

const handleClick = async () => {
    const el = input.value
    if (el) {
        el.value = el.value === 'true' ? 'false' : 'true'
        el.dispatchEvent(new Event('input'))
    }
}
</script>

<template>
    <div class="checkbox" :data-checked="modelValue">
        <span v-if="label">{{ label }}</span>
        <div class="input-wrapper" :data-disabled="disabled" @click="handleClick">
            <input
                ref="input"
                :value="modelValue"
                :disabled="disabled"
                type="checkbox"
                @input="$emit('update:modelValue',  formatBoolean(($event.target as HTMLInputElement).value))">
        </div>
    </div>
</template>

<style scoped>
.checkbox {
    @apply relative
    flex flex-nowrap justify-between items-center;


    .input-wrapper {
        @apply relative
        w-5 h-5 rounded-full ring-1 ring-black bg-transparent cursor-pointer;

        &:after {
            @apply block content-[""]
            w-3.5 h-3.5 rounded-full
            bg-black
            absolute top-[50%] -translate-y-1/2 left-[3px]
            invisible
            ;
        }

        input {
            @apply appearance-none;
        }

        &[data-disabled=true] {
            @apply opacity-50 pointer-events-none;
        }
    }


    &[data-checked=true] {
        & .input-wrapper:after {
            @apply visible;
        }
    }

}
</style>