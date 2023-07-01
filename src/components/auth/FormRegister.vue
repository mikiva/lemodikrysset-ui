<template>
  <form @submit.prevent="register" class="grid grid-cols-1 gap-3 text-center">
    <p class="text-left text-sm">Registrera ett nytt konto och börja skapa Lemodikryss</p>
    <InputField input-id="login-email" type=" text" v-model="email" labelText="Epostadress">

    </InputField>
    <InputField input-id="login-password" v-model="password" :is-password="!showPassword" labelText="Lösenord">
    </InputField>
    <InputField input-id="login-password-confirm" v-model="passwordVerify" :is-password="!showPassword"
      labelText="Lösenord igen">

    </InputField>
    <div class="text-left flex gap-3 text-sm">
      <label for="show-password">Visa lösenord</label>
      <input type="checkbox" v-model="showPassword" id="show-password">
    </div>
    <div class="flex flex-col">
      <span v-if="!loginStatus && errors.email"
        class="p-4 bg-red-200/50 border-red-400/50 border text-slate-800 rounded text-sm">{{ errors.email }}</span>
      <span v-if="!loginStatus && errors.password"
        class="p-4 bg-red-200/50 border-red-400/50 border text-slate-800 rounded text-sm">{{ errors.password }}</span>
    </div>

    <button class="bg-blue-300 rounded border shadow-md py-1 disabled:bg-blue-300/30 disabled:text-slate-400/50" type="
    submit" value="Login" :disabled="(email.length === 0 || password.length === 0) || (password !== passwordVerify)">
      <span v-if="tryLogin">REGISTRERAR...</span>
      <span v-else>REGISTRERA</span>
    </button>
    <div class="text-slate-500 mt-4 text-sm">
      Har du redan ett konto?
      <RouterLink class="underline" to="/login">Logga in</RouterLink>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, provide } from "vue";
import { emailPasswordSignUp } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import InputField from "./InputField.vue";

const email = ref("");
const password = ref("");
const passwordVerify = ref("");
const tryLogin = ref(false);
const loginStatus = ref(true);
const showPassword = ref(false);
const errors = reactive({
  email: "",
  password: "",
});
provide("loginStatus", loginStatus);

async function register() {
  try {
    if (!(email.value && password.value)) return;
    loginStatus.value = true;
    tryLogin.value = true;
    errors.email = "";
    errors.password = "";
    if (password.value !== passwordVerify.value) {
      errors.password = "Lösenord matchar inte";
      loginStatus.value = false;
      return;
    }

    let response = await emailPasswordSignUp({
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
        else if (field.id === "password") errors.password = field.error;
        loginStatus.value = false;
      });
    } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
      console.log("ERROR CRED");
    } else {
      console.log("LOGGED IN");
      window.location.href = "/";
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    tryLogin.value = false;
  }
}
</script>

<style scoped></style>
