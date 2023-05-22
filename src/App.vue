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
import { ref, onMounted, provide } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import TopNav from "./components/TopNav.vue";
const router = useRouter();
const isLoggedIn = ref(false);


provide("isLoggedIn", isLoggedIn)

</script>



<style scoped></style>
