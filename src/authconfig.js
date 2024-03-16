import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";
import EmailVerification from "supertokens-web-js/recipe/emailverification";
import SuperTokens from "supertokens-web-js";

//const apiDomain = import.meta.env.VITE_AUTH_API_DOMAIN || "http://localhost:3001"
const SuperTokensConfig = {
  appInfo: {
    apiDomain: window.location.host,
    apiBasePath: "/api/v1/auth",
    appName: "Lemodikrysset Auth",
  },
  recipeList: [
    EmailVerification.init({

      mode: "REQUIRED",
      getRedirectionURL: async (context) => {
        console.log("REDIRECT", context);
        if (context.action === "VERIFY_EMAIL") {
          return "/verify-email";
        }
      },
    }),
    ThirdPartyEmailPassword.init({
      emailVerificationFeature: {
        mode: "OPTIONAL",
      },
    }),
    Session.init(),
  ],
};

//import SuperTokensConfig from "./authconfig";

export default function initAuth() {
  SuperTokens.init(SuperTokensConfig);
}

//export default SuperTokensConfig;
