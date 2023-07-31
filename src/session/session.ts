import authConfig from "../configs/authConfig";

export const getSession = () => {
  const oidc = localStorage.getItem(
    `oidc.user:${authConfig.authority}:${authConfig.client_id}`
  );

  if(!oidc) return null;

  const session = JSON.parse(oidc);
  return session;
};
