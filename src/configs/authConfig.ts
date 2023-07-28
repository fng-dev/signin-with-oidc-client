const authConfig: any = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  authority: process.env.REACT_APP_AUTHORITY,
  token_endpoint: process.env.REACT_APP_TOKEN_ENDPOINT,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  logout_uri: process.env.REACT_APP_LOGOUT_URI,
  userinfo_endpoint: "oauth2/userinfo",
  response_type: "code",
  scope: "openid profile email offline_access",
  code_challenge_method: "S256",
  timeoutFactor: 0.9,
  strictDiscoveryDocumentValidation: true,
  showDebugInformation: true,
  automaticSilentRenew: true,
};

export default authConfig;
