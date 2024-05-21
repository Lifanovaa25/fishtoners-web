import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";

const createAxiosClient = (initDataRaw?: string) => {
  const axiosClient = axios.create({
    baseURL: "https://a26930-7253.x.d-f.pw",
    timeout: 50000, // 5 секунд таймаут
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
      const apiError: ApiError = error.response.data;	  
      throw  new ApiException(
        error.message,
        error.response.status,
        JSON.stringify(error.response.data),
        error.response.headers,
        apiError
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

  const apiError: ApiError = response.data as unknown as ApiError;
  throw new ApiException(
    "An unexpected server error occurred.",
    status,
    JSON.stringify(response.data),
    response.headers,
    apiError
  );
};
export { createAxiosClient, handleRequest, processResponse };

export interface ApiResponse<T> {
  data: T;
  readonly isSuccess?: boolean;
  readonly isFailure?: boolean;
  error?: ErrorDto;
  value?: T;
}
export interface ResultType {
  readonly isSuccess?: boolean;
  readonly isFailure?: boolean;
  error?: ErrorDto;
}

export interface ApiError {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: ErrorDetail[];
}
export enum ErrorType {
  _0 = 0,
  _1 = 1,
  _2 = 2,
  _3 = 3,
}
export interface ErrorDetail {
  code: string;
  description: string;
  type: ErrorType;
}

export interface ErrorDto {
  readonly code?: string;
  readonly description?: string;
  type?: ErrorType;
}

export class ApiException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: ApiError;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: ApiError
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