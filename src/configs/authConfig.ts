const authConfig: any = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  authority: "https://copec-sa.fusionauth.io/",
  token_endpoint: "https://copec-sa.fusionauth.io/oauth2/token",
  redirect_uri: "http://localhost:7001/auth/callback",
  logout_uri: "http://localhost:7001/logout",
  response_type: "code",
  scope: "openid profile email userId refresh_token offline_access",
  userinfo_endpoint: "oauth2/userinfo",
  response_mode: "query",
  code_challenge_method: "S256",
};

export default authConfig;
