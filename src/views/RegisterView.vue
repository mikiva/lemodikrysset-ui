<template>
    <FormBase formTitle="REGISTRERA">
        <FormRegister></FormRegister>
    </FormBase>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FormBase from "../components/auth/FormBase.vue";
import FormRegister from "../components/auth/FormRegister.vue";
const router = useRouter();
const email = ref("");
const password = ref("");


</script>

<style scoped></style>