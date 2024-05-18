import axios from "axios";

export const createAxiosClient = (initDataRaw?: string) => {
  const axiosClient = axios.create({
    baseURL: "https://a26930-7253.x.d-f.pw",
  });

  if (initDataRaw) {
    axiosClient.defaults.headers.common["Authorization"] = `tma ${initDataRaw}`;
  }

  return axiosClient;
};
