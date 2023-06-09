<template>
  <div>
    <h1>Logged in:</h1>
    <p>{{ userId }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Session from "supertokens-web-js/recipe/session";
const userId = ref("");
onMounted(async () => {
  if (await Session.doesSessionExist()) {
    userId.value = await Session.getUserId();
  }
});
</script>

<style scoped></style>
