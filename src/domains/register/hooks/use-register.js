import { fetchJson } from "lib/fetch-json";
import { BASE_URL } from "const";

const register = (fullname, email, password, avatar) =>
  fetchJson(`${BASE_URL}/register`, {
    method: "POST",
    body: {
      "name": fullname,
      "email": email,
      "password": password,
      "avatar": avatar
    },
  });

export const useRegister = () => {
  return function invokeRegister({ fullname, email, password, avatar }) {
    return register(fullname, email, password, avatar)
  };
};