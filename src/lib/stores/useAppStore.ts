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

    return { bottomDrawer }
})

export default useAppStore