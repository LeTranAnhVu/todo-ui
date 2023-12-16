<script setup lang="ts">
import { ref, toRefs } from 'vue'

type Props = {
    // checked: boolean
    modelValue: boolean
}

const formatBoolean = (value) => value === "true"
const props = defineProps<Props>()

const { modelValue } = toRefs(props)
const input = ref(null)

const handleClick = async () => {
    const el = input.value as HTMLInputElement
    el.value =  !formatBoolean(el.value)
    el.dispatchEvent(new Event('input')) 
}
</script>

<template>
    <div class="checkbox" :data-checked="modelValue" @click="handleClick">
        <input ref="input" :value="modelValue" type="checkbox" @input="$emit('update:modelValue',  formatBoolean($event.target.value))">
    </div>
</template>

<style scoped>
.checkbox {
    @apply relative w-5 h-5;

    input {
        @apply appearance-none;
    }

    &:after {
        @apply block content-[""]
        w-3.5 h-3.5 rounded-full
        bg-black
        absolute top-[50%] -translate-y-1/2 left-[3px]
        invisible
        ;
    }

    &:before {
        @apply block content-[""]
        w-5 h-5 rounded-full ring-1 ring-black bg-transparent
        absolute top-[50%] -translate-y-1/2 left-0
        ;
    }

    &[data-checked=true] {
        &:after {
            @apply visible;
        }
    }

}
</style>