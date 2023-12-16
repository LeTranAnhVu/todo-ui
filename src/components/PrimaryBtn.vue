<script setup lang="ts">

</script>

<template>
    <button class="primary-btn">
        <slot></slot>
    </button>
</template>

<style scoped>
.primary-btn {
    @apply text-base font-semibold w-full py-2 rounded
    text-white bg-black
    hover:bg-gray-900
    active:bg-gray-900;
}
</style>