import ClientOAuth2 from "client-oauth2";

const SurfOAuth2 = new ClientOAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET,
  accessTokenUri: "https://connect.test.surfconext.nl/oidc/token",
  authorizationUri: "https://connect.test.surfconext.nl/oidc/authorize",
  redirectUri: process.env.BASE_URL + "/v1/auth/callback",
  scopes: ["openid"],
});

export default SurfOAuth2;
