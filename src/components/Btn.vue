<script setup lang="ts">
import { toRefs } from 'vue'

type BtnProps = {
    variant?: 'primary' | 'secondary' | 'danger-sim' | 'primary-outline' | 'link'
    size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<BtnProps>(), {
    size: 'md',
    variant: 'primary'
})
const { variant, size } = toRefs(props)
</script>

<template>
    <button class="btn" :data-variant="variant" :data-size="size">
        <slot></slot>
    </button>
</template>

<style scoped>
.btn {
    @apply text-base w-full rounded;

    &[data-size='md'] {
        @apply py-2;
    }

    &[data-size='sm'] {
        @apply py-1;
    }

    &[data-variant='primary'] {
        @apply text-white bg-black font-semibold
        hover:bg-gray-900;
    }

    &[data-variant='secondary'] {
        @apply text-gray-600 bg-transparent
        hover:bg-gray-200;
    }

    &[data-variant='primary-outline'] {
        @apply
        ring-black ring-2
        font-semibold text-black
        hover:bg-black hover:text-white;
    }

    &[data-variant='link'] {
        @apply
        text-black
        font-semibold
        hover:font-bold
        hover:underline;
    }

    &[data-variant='danger-sim'] {
        @apply
        text-red-500
        hover:font-semibold;
    }
}
</style>