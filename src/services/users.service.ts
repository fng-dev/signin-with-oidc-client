import { objectToParams } from "../helpers/uri";
import { getSession } from "../session/session";
import apiInstance from "./api_instance";

class UsersService {
  userManager: any = null;

  constructor(userManager: any) {
    this.userManager = userManager;
  }

  setHeaders = async (access_token: any = null) => {
    const session = getSession();
    apiInstance.defaults.headers.common["Authorization"] = `Bearer ${
      access_token || session?.access_token
    }`;
  };

  getUsers = async (access_token: any = null) => {
    try {
      await this.setHeaders(access_token);
      const response: any = await apiInstance.get(`/users`);
      return response;
    } catch (e: any) {
      return Promise.reject(e);
    }
  };

  getUser = async (payload: any, access_token: any = null) => {
    try {
      await this.setHeaders(access_token);
      const params = objectToParams(payload);
      const response: any = await apiInstance.get(`/user?${params}`);
      return response;
    } catch (e: any) {
      return Promise.reject(e);
    }
  };
}

export default UsersService;
