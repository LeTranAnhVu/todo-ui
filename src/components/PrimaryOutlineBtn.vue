<script setup lang="ts">

</script>

<template>
<button class="primary-outline-btn">
    <slot></slot>
</button>
</template>

<style scoped>
.primary-outline-btn {
    @apply ring-black ring-2 
    text-base font-semibold text-black w-full py-2 rounded
    hover:bg-black hover:text-white 
    active:bg-black active:text-white
}
</style>