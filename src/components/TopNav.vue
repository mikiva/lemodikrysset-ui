<template>
  <div class="box-border outline outline-1 outline-slate-700/25">
    <nav class="md:h-[5rem] h-[3rem] flex items-center justify-between max-w-appWidth w-full px-2 m-auto">
      <div class="flex gap-4">
        <RouterLink to="/" class="md:text-2xl text-lg">Lemodikrysset
        </RouterLink>
      </div>
      <div class="flex gap-4">
        <!--RouterLink to="/register">Register</RouterLink-->
        <RouterLink v-if="!userId" to="/login" class="border p-1 rounded bg-slate-200">Logga in</RouterLink>
        <!--RouterLink v-else to="/login">Sign in</RouterLink-->
        <RouterLink to="/play" class="border p-1 rounded bg-slate-200">

          <span class="flex items-center gap-2">
            <span>Spela</span>
            <span class="material-icons-outlined">smart_display</span>
          </span>
        </RouterLink>
        <RouterLink to="/profile" v-if="userId" class="border p-1 rounded bg-slate-200">
          <span class="flex items-center gap-2">
            <span class="hidden md:inline-block">Min sida</span>
            <span class="material-icons-outlined">house</span>
          </span>
        </RouterLink>
        <!--button v-if="isLoggedIn" @click="handleSignout">Sign out</button-->
        <RouterLink v-if="userId" to="/logout" class="border p-1 rounded bg-slate-200">
          <span class="flex items-center gap-2">
            <span class="hidden md:inline-block">Logga ut</span>
            <span class="material-icons">logout</span>
          </span>
        </RouterLink>
      </div>
    </nav>
  </div>
  <slot></slot>
</template>

<script setup>
import Session from "supertokens-web-js/recipe/session";
import { ref, onMounted, inject } from "vue";
import { currentScreenWidthSymbol } from "@/injectionSymbols";

const current = inject(currentScreenWidthSymbol);
const userId = ref("");

onMounted(async () => {
  if (await Session.doesSessionExist())
    userId.value = await Session?.getUserId();
});
</script>

<style scoped></style>
