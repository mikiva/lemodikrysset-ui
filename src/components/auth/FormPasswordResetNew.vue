<template>
  <form @submit.prevent="setNewPassword" class="grid grid-cols-1 gap-3 text-center">
    <p class="text-left text-sm text-slate-600">Välj ett nytt lösenord. </p>
    <InputField input-id="new-password" v-model="password" icon="lock" labelText="Lösenord" :is-password="!showPassword">
    </InputField>
    <InputField input-id="new-password-verify" v-model="passwordVerify" icon="lock" labelText="Lösenord igen"
      :is-password="!showPassword">
    </InputField>
    <div class="text-left flex gap-3 text-sm">

      <label for="show-password">Visa lösenord</label>
      <input type="checkbox" v-model="showPassword" id="show-password">
    </div>


    <template v-if="errors.password">
      <span class="p-4 bg-red-200/50 border-red-400/50 border text-slate-800 rounded text-sm">{{ errors.password }}</span>
    </template>

    <button class="bg-blue-300 py-1 rounded border shadow-md disabled:bg-blue-300/30 disabled:text-slate-400/50"
      type="submit" :disabled="password.length === 0 || (password !== passwordVerify)">
      <span>ÅTERSTÄLL</span>
    </button>
  </form>
</template>

<script setup>
import { ref, reactive, provide } from "vue";
import { submitNewPassword } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import Session from "supertokens-web-js/recipe/session"

import InputField from "./InputField.vue";
const showPassword = ref(false);
const password = ref("");
const passwordVerify = ref("");
const tryLogin = ref(false);
const loginStatus = ref(true);
const errors = reactive({
  password: "",
});

provide("loginStatus", loginStatus);
async function setNewPassword() {
  try {
    if (!password.value) return;
    tryLogin.value = true;
    loginStatus.value = true;
    errors.password = ""
    let response = await submitNewPassword({
      formFields: [
        {
          id: "password",
          value: password.value,
        },
      ],
    });
    if (response.status === "FIELD_ERROR") {
      response.formFields.forEach((field) => {
        if (field.id === "password") errors.password = field.error;
      });
    } else if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
      loginStatus.value = false;
      errors.password = "Session inte längre aktiv. Prova begära ny lösenordsåterställning på inloggningssidan."
    } else {
      console.log("LOGGED IN");
      //window.location.href = "/profile";
      if (await Session.doesSessionExist()) {
        await Session.signOut();
      }
      window.location.href = "/login";


    }
  } catch (err) {
    console.log(err.message);
  } finally {
    tryLogin.value = false;
  }
}
</script>

<style scoped></style>
