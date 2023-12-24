<script setup lang="ts">
import { toRefs } from 'vue'

type BtnProps = {
    variant: 'primary' | 'secondary' | 'danger-sim' | 'primary-outline'
} 

const props = defineProps<BtnProps>()
const {variant} = toRefs(props)
</script>

<template>
    <button class="btn" :data-variant="variant">
        <slot></slot>
    </button>
</template>

<style scoped>
.btn {
    @apply text-base w-full py-2 rounded;
    
    &[data-variant='primary'] {
        @apply text-white bg-black font-semibold
        hover:bg-gray-900
        active:bg-gray-900;
    }

    &[data-variant='secondary'] {
        @apply text-gray-600 bg-transparent
        hover:bg-gray-200
        active:bg-gray-200;
    }

    &[data-variant='primary-outline'] {
        @apply 
        ring-black ring-2
        font-semibold text-black
        hover:bg-black hover:text-white
        active:bg-black active:text-white;
    }

    &[data-variant='danger-sim'] {
        @apply
        text-red-500 
        hover:font-semibold
        active:font-semibold;
    }
}
</style>