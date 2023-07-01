<template>
  <FormBase formTitle="LOGGAR UT...">
  </FormBase>
</template>

<script setup>
import { onMounted } from "vue";
import FormBase from "../components/auth/FormBase.vue";
import FormLogin from "../components/auth/FormLogin.vue";

import Session from "supertokens-web-js/recipe/session";
import { useRouter } from "vue-router";
const router = useRouter()

onMounted(async () => {
  if (await Session.doesSessionExist()) {
    await Session.signOut();
  }
  //await router.replace({ name: "LogInView" })
  window.location.href = "/login";
})

</script>

<style scoped></style>
