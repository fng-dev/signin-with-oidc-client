const authConfig: any = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  authority: process.env.REACT_APP_AUTHORITY,
  token_endpoint: process.env.REACT_APP_TOKEN_ENDPOINT,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  logout_uri: process.env.REACT_APP_LOGOUT_URI,
  response_type: "code",
  scope: "openid profile email userId refresh_token offline_access",
  userinfo_endpoint: "oauth2/userinfo",
  response_mode: "query",
  code_challenge_method: "S256",
};

export default authConfig;
