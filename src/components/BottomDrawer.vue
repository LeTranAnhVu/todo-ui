<script setup lang="ts">
import { computed } from 'vue'
import useAppStore from '@/lib/stores/useAppStore.ts'

const appStore = useAppStore()
const state = computed(() => appStore.bottomDrawer)
</script>

<template>
    <div v-if="state.isOpened" class="overlay" @click="appStore.closeBottomDrawer()"></div>
    <div class="drawerB" :data-opened="state.isOpened">
        <div class="ml-auto">
            <Icon
                icon="fa-regular fa-circle-xmark"
                size="lg"
                class="closeIcon"
                @click="appStore.closeBottomDrawer()" />
        </div>
        <div id="drawer-bottom">
            <component
                :is="state.component"
                v-if="state.component"
                v-bind="state.props"
                @done="appStore.closeBottomDrawer()"
                @cancel="appStore.closeBottomDrawer()"
            ></component>
        </div>
    </div>
</template>

<style scoped lang="scss">
.drawerB {
    @apply bg-white
    absolute bottom-0 left-0 right-0
    translate-y-[100%]
    p-3 max-h-[600px]
    overflow-auto
    rounded-t-2xl
    z-[999]
    transition-transform duration-[200ms] ease-in-out;
    &[data-opened=true] {
        @apply translate-y-0;
    }

    .closeIcon {
        @apply block ml-auto;
    }
}

.overlay {
    @apply block
    absolute top-0 left-0 right-0 bottom-0
    content-[""]
    z-[998] bg-gray-500 opacity-40;
}

</style>