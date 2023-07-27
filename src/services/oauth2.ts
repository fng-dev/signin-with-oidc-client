import authConfig from "../configs/authConfig";
import { getSession } from "../session";
import fusionAuthInstance from "./fusion_auth_instance";

class Oauth2Service {
  setHeaders = (access_token: any = null) => {
    const session = getSession("session");
    fusionAuthInstance.defaults.headers.common["Authorization"] = `Bearer ${
      access_token || session?.access_token
    }`;
  };

  renewToken = async () => {
    try {
      const session = getSession("session");
      const response: any = await fusionAuthInstance.post(
        authConfig.token_endpoint,
        {
          grant_type: "refresh_token",
          refresh_token: session?.refresh_token,
          client_id: authConfig.client_id,
        }
      );
      return response;
    } catch (e: any) {
      return Promise.reject(e);
    }
  };

  refreshToken = async () => {
    try {
      const session = getSession("session");
      const response: any = await fusionAuthInstance.post(`api/jwt/refresh`, {
        token: session.access_token,
        refreshToken: session.refresh_token,
      });

      return response;
    } catch (e: any) {
      return Promise.reject(e);
    }
  };

  getProfile = async (access_token: any = null) => {
    try {
      this.setHeaders(access_token);
      const response: any = await fusionAuthInstance.get(
        authConfig.userinfo_endpoint
      );
      return response;
    } catch (e: any) {
      return Promise.reject(e);
    }
  };
}

export default Oauth2Service;
