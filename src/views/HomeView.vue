<template>
    <p v-if="isLoggedIn"><button @click="ping">ping</button></p>
</template>

<script setup>

import { onMounted, inject } from 'vue';
const isLoggedIn = inject("isLoggedIn");


</script>

<style scoped></style>