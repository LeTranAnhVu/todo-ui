import { defineStore } from 'pinia'
import { Component, reactive, ref } from 'vue'


const useAppStore = defineStore('app-settings', () => {
    const bottomDrawer = reactive<{
        isOpened: boolean,
        component: Component | null,
        props: Record<string, unknown> | null
    }>({
        isOpened: false,
        component: null,
        props: null
    })

    const transitionDirection = ref<'slide-ltr' | 'slide-rtl'>('slide-ltr')

    const closeBottomDrawer = () => {
        bottomDrawer.isOpened = false

        // Has some delay to make the transition smoother
        window.setTimeout(() => {
            bottomDrawer.component = null
            bottomDrawer.props = null
        }, 250)
    }

    return { bottomDrawer, closeBottomDrawer, transitionDirection }
})

export default useAppStore