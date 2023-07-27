import axios from "axios";
import authConfig from "../configs/authConfig";
import { setSession } from "../session";

const instance = axios.create({
  baseURL: authConfig.authority,
});

instance.interceptors.response.use(
  function (response: any) {
    return response;
  },
  (error: any) => {
    if (error.response && error.response.status === 401) {
      setSession("session", null);
      window.dispatchEvent(new Event("logout_action"));
    }
    return Promise.reject(error);
  }
);

export default instance;
