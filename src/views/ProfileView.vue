<template>
  <div>
    <h1 class="font-bold">Inloggad som</h1>
    <p>{{ userId }}</p>
    <hr>
    <p class="py-3">
      <RouterLink :to="{ name: 'create' }" class="underline color-slate-500">Nytt kryss</RouterLink>
    </p>
    <hr>
    <h1 class="font-bold">Inställningar</h1>
    <p class="pt-3 pb-2">
      TODO: Byta lösenord
    </p>
    <p class="py-2">
      TODO: Hantera kryss
    </p>
    <p class="py-2">
      TODO: Hantera kryss
    </p>
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
