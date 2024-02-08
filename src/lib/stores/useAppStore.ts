import { defineStore } from 'pinia'
import { Component, reactive } from 'vue'


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

    const closeBottomDrawer = () => {
        bottomDrawer.isOpened = false
        bottomDrawer.component = null
        bottomDrawer.props = null
    }

    return { bottomDrawer, closeBottomDrawer }
})

export default useAppStore