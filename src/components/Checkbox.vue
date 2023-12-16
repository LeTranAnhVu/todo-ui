<script setup lang="ts">
import { ref, toRefs } from 'vue'

type Props = {
    // checked: boolean
    modelValue: boolean
    label?: string
}

const formatBoolean = (value) => value === 'true'
const props = defineProps<Props>()

const { modelValue, label } = toRefs(props)
const input = ref(null)

const handleClick = async () => {
    const el = input.value as HTMLInputElement
    console.log('check', el.value)
    el.value = !formatBoolean(el.value)
    el.dispatchEvent(new Event('input'))
}
</script>

<template>
    <div class="checkbox" :data-checked="modelValue">
        <span v-if="label">{{ label }}</span>
        <div class="input-wrapper" @click="handleClick">
            <input ref="input" :value="modelValue" type="checkbox"
                   @input="$emit('update:modelValue',  formatBoolean($event.target.value))">
        </div>
    </div>
</template>

<style scoped>
.checkbox {
    @apply relative
    flex flex-nowrap justify-between items-center;

    .input-wrapper {
        @apply relative
        w-5 h-5 rounded-full ring-1 ring-black bg-transparent;

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
    }

    


    &[data-checked=true] {
        & .input-wrapper:after {
            @apply visible;
        }
    }

}
</style>