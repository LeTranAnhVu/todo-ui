import { defineStore } from 'pinia'
import { reactive } from 'vue'

const useToastStore = defineStore('toast', () => {
    const feed = reactive<{
        message: string | null,
        type: 'success' | 'error' | null
    }>({message: null, type: null})

    const addFeed = (type: 'success' | 'error', message: string ) => {
        feed.message = message
        feed.type = type
    }
    const burnFeed = () => {
        feed.message = null
        feed.type = null
    }

    return { feed, burnFeed, addFeed }
})

export default useToastStore