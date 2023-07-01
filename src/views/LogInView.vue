<template>
  <FormBase formTitle="LOGGA IN">
    <FormLogin></FormLogin>
    <hr class="pt-2 pb-4">
    <div class="text-sm text-center text-slate-500">Har du inget konto?
      <RouterLink class="underline" :to="{ name: 'RegisterView' }">Registrera</RouterLink>
    </div>
  </FormBase>
</template>

<script setup>
import { RouterLink } from "vue-router";
import FormBase from "../components/auth/FormBase.vue";
import FormLogin from "../components/auth/FormLogin.vue";
</script>

<style scoped></style>
