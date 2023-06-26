<template>
  <form
    @submit.prevent="login"
    class="grid grid-cols-1 gap-3 text-center"
    :class="{ 'animate-shake': !loginStatus }"
  >
    <input-field
      input-id="login-email"
      type=" text"
      v-model="email"
      icon="person"
      labelText="Epost"
    >
      <span class="ml-3 text-red-500" v-if="errors.email">{{
        errors.email
      }}</span>
    </input-field>
    <input-field
      input-id="login-password"
      icon="lock"
      v-model="password"
      is-password
      labelText="Lösenord"
    ></input-field>
    <div class="flex flex-col">
      <span
        v-if="!loginStatus && errors.credentials"
        class="p-4 bg-red-200/50 border-red-400/50 border text-slate-800 rounded text-sm"
        >{{ errors.credentials }}</span
      >
    </div>
    <button
      class="bg-blue-300 rounded border shadow-md disabled:bg-blue-300/30 disabled:text-slate-400/50"
      type="submit"
      value="Login"
      :disabled="tryLogin"
    >
      <span v-if="tryLogin">LOGGAR IN...</span>
      <span v-else>LOGGA IN</span>
    </button>
    <div class="text-slate-500 mt-4">
      Har du inget konto?
      <router-link class="underline" to="/register">Registrera</router-link>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, provide } from "vue";
import { emailPasswordSignIn } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import InputField from "./InputField.vue";

const email = ref("");
const password = ref("");
const tryLogin = ref(false);
const loginStatus = ref(true);
const errors = reactive({
  email: "",
  password: "",
  credentials: "",
});

provide("loginStatus", loginStatus);
async function login() {
  try {
    if (!(email.value && password.value)) return;
    tryLogin.value = true;
    loginStatus.value = true;
    errors.email = "";
    errors.password = "";
    errors.credentials = "";
    let response = await emailPasswordSignIn({
      formFields: [
        {
          id: "email",
          value: email.value,
        },
        {
          id: "password",
          value: password.value,
        },
      ],
    });
    if (response.status === "FIELD_ERROR") {
      response.formFields.forEach((field) => {
        if (field.id === "email") errors.email = field.error;
      });
    } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
      loginStatus.value = false;
      console.log("ERROR CRED");
      errors.credentials = "Felaktig epostadress eller lösenord!";
    } else {
      console.log("LOGGED IN");
      window.location.href = "/profile";
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    tryLogin.value = false;
  }
}
</script>

<style scoped></style>
