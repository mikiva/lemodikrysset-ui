
import Session from 'supertokens-web-js/recipe/session';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword'

const apiDomain = import.meta.env.VITE_AUTH_API_DOMAIN || "http://localhost:3001"
const SuperTokensConfig = {
    appInfo: {
        apiDomain: apiDomain,
        apiBasePath: "/auth",
        appName: "Lemodikrysset Auth",

    },
    recipeList: [
        Session.init(),
        ThirdPartyEmailPassword.init(),
    ],
};

export default SuperTokensConfig