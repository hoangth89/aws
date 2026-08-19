import { UserManager } from "oidc-client-ts";

const cognitoAuthConfig = {
    authority: "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_gyzClmGwX",
    client_id: "21b6jjs7r2effrlrke49ud14ao",
    redirect_uri: "https://aws.dict.io.vn/redirect",
    response_type: "code",
    scope: "phone openid email"
};

// create a UserManager instance
export const userManager = new UserManager({
    ...cognitoAuthConfig,
});

export async function signOutRedirect () {
    const clientId = "21b6jjs7r2effrlrke49ud14ao";
    const logoutUri = "<logout uri>";
    const cognitoDomain = "https://<user pool domain>";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
};