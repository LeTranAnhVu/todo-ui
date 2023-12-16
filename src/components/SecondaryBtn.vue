<script setup lang="ts">

</script>

<template>
    <button class="secondary-btn">
        <slot></slot>
    </button>
</template>

<style scoped>
.secondary-btn {
    @apply text-base w-full py-2
    text-gray-600 bg-transparent
    hover:text-black
    active:text-black;
}
</style>