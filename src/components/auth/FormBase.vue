<template>
    <div class="max-w-sm m-auto max-h-2xl border py-10 px-10 rounded shadow-md">
        <h1 v-if="formTitle" class="text-lg font-bold mb-4">{{ formTitle }}</h1>
        <slot></slot>
    </div>
</template>

<script setup>

defineProps(['formTitle'])

</script>

<style scoped></style>