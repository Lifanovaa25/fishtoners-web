import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";

const createAxiosClient = (initDataRaw?: string) => {
  const axiosClient = axios.create({
    baseURL: "https://a26930-7253.x.d-f.pw",
  });

  if (initDataRaw) {
    axiosClient.defaults.headers.common["Authorization"] = `tma ${initDataRaw}`;
  }

  return axiosClient;
};

const handleRequest = async <T>(
  instance: AxiosInstance,
  options: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await instance.request<T>(options);
    return processResponse(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new ApiException(
        error.message,
        error.response.status,
        JSON.stringify(error.response.data),
        error.response.headers,
        error.response.data
      );
    }
    throw error;
  }
};

const processResponse = async <T>(response: AxiosResponse<T>): Promise<T> => {
  const status = response.status;
  if (status >= 200 && status < 300) {
    return response.data;
  }
  throw new ApiException(
    "An unexpected server error occurred.",
    status,
    JSON.stringify(response.data),
    response.headers,
    response.data
  );
};

export { createAxiosClient, handleRequest, processResponse };

class ApiException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();
    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}