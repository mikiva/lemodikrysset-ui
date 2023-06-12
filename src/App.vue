<template>
  <div class="h-full">
    <TopNav>
      <main
        class="m-auto md:h-[calc(100%-5rem)] h-[calc(100%-3rem)] relative py-2 max-w-appWidth"
      >
        <RouterView />
      </main>
    </TopNav>
  </div>
</template>

<script setup>
import { ref, onMounted, provide, onBeforeMount } from "vue";
import { RouterView, useRouter } from "vue-router";
import TopNav from "./components/TopNav.vue";
import Session from "supertokens-web-js/recipe/session";
import { currentScreenSymbol, isLoggedInSymbol } from "@/injectionSymbols";

const currentScreenWidth = ref(null);
const isLoggedIn = ref(false);

onBeforeMount(async () => {
  if (await Session.doesSessionExist()) isLoggedIn.value = true;
});

onMounted(() => {
  window.addEventListener("resize", () => {
    currentScreenWidth.value = screen.width;
  });
});

provide(isLoggedInSymbol, isLoggedIn);
provide(currentScreenSymbol, currentScreenWidth);
</script>

<style scoped></style>
