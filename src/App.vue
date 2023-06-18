<template>
  <div class="h-full">
    <ToastsContainer></ToastsContainer>
    <TopNav>
      <main
        class="m-auto md:h-[calc(100%-5rem)] h-[calc(100%-3rem)] relative p-2 max-w-appWidth"
      >
        <RouterView />
      </main>
    </TopNav>
  </div>
</template>

<script setup>
import { ref, onMounted, provide, onBeforeMount, onBeforeUnmount } from "vue";
import { RouterView } from "vue-router";
import TopNav from "./components/TopNav.vue";
import Session from "supertokens-web-js/recipe/session";
import {
  currentScreenHeightSymbol,
  currentScreenWidthSymbol,
  isLoggedInSymbol,
} from "@/injectionSymbols";
import ToastsContainer from "@/components/toasts/ToastsContainer.vue";

const currentScreenWidth = ref(null);
const currentScreenHeight = ref(null);
const isLoggedIn = ref(false);

onBeforeMount(async () => {
  if (await Session.doesSessionExist()) isLoggedIn.value = true;
});

function handleResize() {
  currentScreenWidth.value = screen.width;
  currentScreenHeight.value = screen.height;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
provide(isLoggedInSymbol, isLoggedIn);
provide(currentScreenWidthSymbol, currentScreenWidth);
provide(currentScreenHeightSymbol, currentScreenHeight);
</script>

<style scoped></style>
