<template>
  <form @submit.prevent="register" class="grid grid-cols-1 gap-3 text-center">
    <input-field
      input-id="login-email"
      type=" text"
      v-model="email"
      labelText="Epost"
    >
      <span class="ml-3 text-red-500" v-if="errors.email">{{
        errors.email
      }}</span>
    </input-field>
    <input-field
      input-id="login-password"
      v-model="password"
      is-password
      labelText="Lösenord"
    ></input-field>
    <input-field
      input-id="login-password-confirm"
      v-model="password"
      is-password
      labelText="Lösenord"
    ></input-field>
    <button
      class="bg-blue-300 rounded border shadow-md"
      type="submit"
      value="Login"
    >
      REGISTRERA
    </button>
    <div class="text-slate-500 mt-4">
      Har du redan ett konto?
      <router-link class="underline" to="/login">Logga in</router-link>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { emailPasswordSignUp } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import InputField from "./InputField.vue";
const email = ref("");
const password = ref("");

const errors = reactive({
  email: "",
  password: "",
});

async function register() {
  try {
    if (!(email.value && password.value)) return;

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
      });
    } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
      console.log("ERROR CRED");
    } else {
      console.log("LOGGED IN");
      window.location.href = "/";
    }
  } catch (err) {
    console.log(err.message);
  }
}
</script>

<style scoped></style>
