<template>
    <div>login</div>
    <form @submit.prevent="login">
        <input-field type="text" v-model="email"></input-field>
        <input-field v-model="password" is-password></input-field>
        <input type="submit" @click="login" value="Login">
    </form>
</template>

<script setup>

import { ref } from "vue"
import { emailPasswordSignIn } from "supertokens-web-js/recipe/thirdpartyemailpassword"
import InputField from "./InputField.vue";
const email = ref("")
const password = ref("")



async function login() {
    try {
        let response = await emailPasswordSignIn({
            formFields: [{
                id: "email",
                value: email.value
            },
            {
                id: "password",
                value: password.value
            }]
        })
        if (response.status === "FIELD_ERROR") {
            console.log("nope");
        }
        else if (response.status === "WRONG_CREDENTIALS_ERROR") {
            console.log("ERROR CRED")
        }
        else {
            console.log("LOGGED IN");
            window.location.href = "/"

        }
    } catch (err) {
        console.log(err.message);
    }
}



</script>

<style scoped></style>