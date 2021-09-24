import { useQuery } from "react-query";
import { fetchJson } from "lib/fetch-json";
import { BASE_URL } from "const";

const getWhoAmI = (token, signal) => {
  return fetchJson(`${BASE_URL}/whoami`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal,
  });
};

export const useWhoAmI = (accessToken) => {
  return useQuery('user', () => getWhoAmI(accessToken), {
    staleTime: 3000,
  });
};
