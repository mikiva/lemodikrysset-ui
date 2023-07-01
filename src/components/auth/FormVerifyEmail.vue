<template>
  <template v-if="!hasSent">
    <form
      @submit.prevent="sendEmail"
      class="grid grid-cols-1 gap-3 text-center"
    >
      <button
        class="bg-blue-300 rounded border shadow-md"
        type="submit"
        value="Login"
      >
        VERIFIERA
      </button>
    </form>
  </template>
  <template v-else>
    <h2>Var god titta mailen.</h2>
  </template>
</template>

<script setup>
import { reactive, ref } from "vue";
import { sendVerificationEmail } from "supertokens-web-js/recipe/emailverification";
const hasSent = ref(false);
const errors = reactive({
  email: "",
  password: "",
});
async function sendEmail() {
  try {
    let response = await sendVerificationEmail();

    if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
      alert("Redan verifierad");
    } else {
      //const res = response.json();
      console.log(response);
      hasSent.value = true;
    }
  } catch (err) {
    console.log(err);
  }
}

async function verify2() {
  try {
    const body = {
      rid: "emailverification",
      apiBasePath: `${window.location.href}`,
    };
    console.log(body);
    let response = await fetch("/api/v1/auth/user/verify/token", {
      method: "POST",
    });
    console.log(response.status);
    if (response.status === "FIELD_ERROR") {
      response.formFields.forEach((field) => {
        if (field.id === "email") errors.email = field.error;
      });
    } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
      console.log("ERROR CRED");
    } else {
      console.log("LOGGED IN");
      //  window.location.href = "/";
    }
  } catch (err) {
    console.log(err.message);
  }
}
</script>

<style scoped></style>
