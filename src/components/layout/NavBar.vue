<script setup lang="ts">

</script>

<template>
<ul class="navbar">
    <li class="navbar-item active">Tasks</li>
    <li class="navbar-item">Report</li>
    <li class="navbar-item">+ New</li>
</ul>
</template>

<style scoped lang="scss">
.navbar {
    @apply flex flex-nowrap items-center justify-center
    ring-2 ring-black rounded-lg
    p-0.5;
    
    .navbar-item {
        @apply grow
        text-center text-black font-medium rounded-lg py-0.5;
        &.active {
        @apply text-white font-normal bg-black;
        }
    }
    
}
</style>