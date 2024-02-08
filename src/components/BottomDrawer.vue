<script setup lang="ts">
import { computed } from 'vue'
import useAppStore from '@/lib/stores/useAppStore.ts'

const appStore = useAppStore()
const state = computed(() => appStore.bottomDrawer)
</script>

<template>
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
    @apply bg-gray-200
    absolute -bottom-[100%] left-0 right-0 p-3 max-h-[600px]
    overflow-auto
    rounded-t-2xl
    z-[999]
    transition-all duration-300 ease-in-out;
    &[data-opened=true] {
        @apply bottom-0;
    }

    .closeIcon {
        @apply block ml-auto;
    }
}
</style>