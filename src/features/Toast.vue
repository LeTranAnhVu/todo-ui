<script setup lang="ts">


import useToastStore from '@/features/useToastStore.ts'
import { watch } from 'vue'

const { feed, burnFeed } = useToastStore()

watch(() => feed.message, () => {
    if (feed.message) {
        window.setTimeout(() => {
            burnFeed()
        }, 3000)
    }
})
</script>

<template>
    <div class="toast">
        <Transition name="slide-fade">
            <div v-if="feed.message" class="message">
                <div class="icon-wrapper">
                    <Icon v-if="feed.type === 'error'" icon="fa-solid fa-triangle-exclamation" />
                    <Icon v-else icon="fa-solid fa-circle-check" />
                </div>
                <span>{{ feed.message }}</span>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.toast {
    @apply absolute bottom-2 left-0 right-0 z-[900];

    .message {
        @apply ring-1 ring-black rounded p-2 m-auto w-fit bg-white
        flex flex-nowrap gap-2 items-center;
    }
}
</style>