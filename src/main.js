import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import SuperTokensConfig from "./config"
import SuperTokens from "supertokens-web-js";

SuperTokens.init(SuperTokensConfig);

import "./assets/index.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
