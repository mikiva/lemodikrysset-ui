<template>
  <div class="box-border outline outline-1 outline-gray-400/50">
    <nav
      class="md:h-[5rem] h-[3rem] flex items-center justify-between max-w-appWidth w-full px-2 m-auto"
    >
      <div class="flex gap-4">
        <RouterLink to="/" class="md:text-2xl text-lg"
          >Lemodikrysset
        </RouterLink>
      </div>
      <div class="flex gap-4">
        <!--RouterLink to="/register">Register</RouterLink-->
        <RouterLink v-if="userId" to="/logout">Sign out</RouterLink>
        <!--RouterLink v-else to="/login">Sign in</RouterLink-->
        <RouterLink to="/play">Spela</RouterLink>
        <RouterLink to="/profile" v-if="userId"
          >{{ userId.substring(0, 4) }}
        </RouterLink>
        <!--button v-if="isLoggedIn" @click="handleSignout">Sign out</button-->
      </div>
    </nav>
  </div>
  <slot></slot>
</template>

<script setup>
import Session from "supertokens-web-js/recipe/session";
import { ref, onMounted, inject } from "vue";
import { currentScreenSymbol } from "@/injectionSymbols";

const current = inject(currentScreenSymbol);
const userId = ref("");

onMounted(async () => {
  if (await Session.doesSessionExist())
    userId.value = await Session?.getUserId();
});
</script>

<style scoped></style>
