<script setup lang="ts">

</script>

<template>
<button class="naked-dander-btn">
    <slot></slot>
</button>
</template>

<style scoped>
.naked-dander-btn {
    @apply
    text-base text-red-400 w-full py-2
    hover:font-semibold 
    active:font-semibold
}
</style>