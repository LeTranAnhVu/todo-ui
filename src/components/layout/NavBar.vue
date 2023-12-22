<script setup lang="ts">

</script>

<template>
    <div class="navbar">
        <router-link to="/tasks" class="navbar-item active">
            Tasks
        </router-link>
        <router-link disabled to="/reports" class="navbar-item">
            Reports
        </router-link>
        <router-link to="/create-task" class="navbar-item">
            New task
        </router-link>
    </div>
</template>

<style scoped lang="scss">
.navbar {
    @apply flex flex-nowrap items-center justify-center
    ring-2 ring-black rounded-lg
    p-0.5;

    .navbar-item {
        @apply grow
        text-center text-black font-medium rounded-lg py-0.5;
        &.router-link-active {
            @apply text-white font-normal bg-black;
        }
        &[disabled] {
            @apply opacity-50 pointer-events-none;
        }
    }

}
</style>