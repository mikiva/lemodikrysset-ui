<template>
    <h1>Register account</h1>
    <p><input type="text" v-model="email"></p>
    <p><input type="password" v-model="password"></p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signIntWithGoogle">Sign in with google</button></p>
    <div id="authapp"></div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const email = ref("");
const password = ref("");


</script>

<style scoped></style>