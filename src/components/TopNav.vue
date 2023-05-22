<template>
    <nav class="h-[3rem] flex items-center gap-2 justify-center">
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink to="/register">Register</RouterLink> |
        <RouterLink v-if="userId" to="/logout">Sign out</RouterLink>
        <RouterLink v-else to="/login">Sign in</RouterLink> |
        <RouterLink to="/lemodi">Lemodi</RouterLink> |
        {{ userId }}
        <!--button v-if="isLoggedIn" @click="handleSignout">Sign out</button-->
    </nav>
    <slot></slot>
</template>

<script setup>
import Session from "supertokens-web-js/recipe/session"
import { ref, onMounted } from "vue"
const userId = ref("")

onMounted(async () => {
    if (await Session.doesSessionExist())
        userId.value = await Session?.getUserId()
}
)




</script>

<style scoped></style>