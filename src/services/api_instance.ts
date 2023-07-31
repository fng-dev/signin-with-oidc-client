import axios from "axios";

const instance = axios.create({
  baseURL: "https://0l6jia56pi.execute-api.sa-east-1.amazonaws.com",
});

instance.interceptors.response.use(
  function (response: any) {
    return response;
  },
  (error: any) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 400)
    ) {
      window.location.href = "/logout";
      window.dispatchEvent(new Event("logout_action"));
    }
    return Promise.reject(error);
  }
);

export default instance;
