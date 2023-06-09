<template>
  <div class="h-full">
    <TopNav>
      <main class="h-[calc(100%-3rem)] relative">
        <RouterView />
      </main>
    </TopNav>
  </div>
</template>

<script setup>
import { ref, onMounted, provide, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import TopNav from "./components/TopNav.vue";
import Session from "supertokens-web-js/recipe/session";

const router = useRouter();
const isLoggedIn = ref(false);

onBeforeMount(async () => {
  if (await Session.doesSessionExist()) isLoggedIn.value = true;
});

//a2fa326d-838f-46ee-9edd-b6e5cf17fc2d
provide("isLoggedIn", isLoggedIn);
</script>

<style scoped></style>
