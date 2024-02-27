import axios from "axios";
import md5 from "md5";

export const baseApi = () => {
  let time = new Date();
  let year = time.getFullYear().toString();
  let month = (time.getMonth() + 1).toString().padStart(2, "0");
  let day = time.getDate().toString().padStart(2, "0");
  let timestamp = `${year}${month}${day}`;

  let authString = `${import.meta.env.VITE_PASSWORD_X_AUTH}_${timestamp}`;
  let hashedAuth = md5(authString); // хэшируем авторизационную строку

  return axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      "X-auth": hashedAuth,
    },
  });
};
