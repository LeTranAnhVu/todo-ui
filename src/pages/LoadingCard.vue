<script setup lang="ts">
import { toRefs } from 'vue'
import Spinner from '@/components/Spinner.vue'

type Props = {
    isLoading: boolean
}

const props = defineProps<Props>()
const { isLoading } = toRefs(props)
</script>

<template>
    <div class="loading-card">
        <div v-if="isLoading" class="overlay">
            <Spinner />
        </div>
        <slot></slot>
    </div>
</template>

<style scoped>
.loading-card {
    @apply relative;
    .overlay {
        @apply absolute z-10 opacity-70
        top-0 left-0 right-0 bottom-0
        flex justify-center items-center;
    }
}
</style>