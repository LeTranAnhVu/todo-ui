<script setup lang="ts">
import PrimaryBtn from '@/components/PrimaryBtn.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { ref } from 'vue'

const {getAccessTokenSilently} = useAuth0()
const token = ref()
const getToken = async () => {
    token.value = await getAccessTokenSilently()
}

</script>

<template>
    <div class="max-w-[450px] mx-auto pt-5">
        <router-view></router-view>
        
        
        <PrimaryBtn class="mt-10" @click="getToken">Get Access Token</PrimaryBtn>
        <code class="w-full">{{token}}</code>
    </div>
</template>

<style scoped></style>