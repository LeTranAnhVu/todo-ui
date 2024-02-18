import type { Ref } from 'vue'

import { register } from 'register-service-worker'
import { ref } from 'vue'

// https://medium.com/google-developer-experts/workbox-4-implementing-refresh-to-update-version-flow-using-the-workbox-window-module-41284967e79c
// https://github.com/yyx990803/register-service-worker
// https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading
export const useServiceWorker = (): {
    appNeedsRefresh: Ref<boolean>
    offlineAppReady: Ref<boolean>
} => {
    const offlineAppReady = ref(false)
    const appNeedsRefresh = ref(false)

    register(
        '/sw.js',
        {
            registrationOptions: { scope: '/' },
            updated: async (registration) => {
                await registration.update()
                registration.unregister()
                appNeedsRefresh.value = true
            },
            cached: () => {
                offlineAppReady.value = true
            }
        }
    )

    return {
        appNeedsRefresh,
        offlineAppReady
    }
}