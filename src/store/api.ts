import axios, { AxiosError } from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelToken,
} from "axios";

export interface ApiResponse<T> {
  data: T;
  readonly isSuccess?: boolean;
  readonly isFailure?: boolean;
  error?: ErrorDto;
  value?: T;
}

export interface IClient {
  /**
   * ѕополнение баланса пользовател¤
   * @param body (optional)
   * @return OK
   */
  deposit(body?: DepositDto | undefined): Promise<ResultType>;
  /**
   * Получить данные для панели пользователя
   * @return OK
   */
  getUserPanelData(): Promise<ApiResponse<PanelDataVm>>;
  /**
   * Получить список активных паков юзера (для страницы с крючками)
   * @return OK
   */
  getActiveUsersPacks(): Promise<ApiResponse<UsersPacksVm>>;
  /**
   * Получить список паков доступных юзеру для покупки (для магазина)
   * @return OK
   */
  getPacks(): Promise<ApiResponse<PackVm[]>>;
  /**
   * Получить данные по рефам
   * @return OK
   */
  getRefData(): Promise<ApiResponse<RefDataVm>>;
  /**
   * Получить рыбок текущего пользователя (доступных и забранных)
   * @return OK
   */
  getUserFishes(): Promise<ApiResponse<FishesVm>>;
  /**
   * Получить таблицу лидеров
   * @return OK
   */
  getLeaderboard(): Promise<ApiResponse<UserVm[]>>;
  /**
   * Получить сегодняшнюю награду
   * @return OK
   */
  claimTodayReward(): Promise<ApiResponse<number>>;
  /**
   * Купить пак
   * @param body (optional)
   * @return OK
   */
  buyPack(body?: BuyDto | undefined): Promise<ApiResponse<string>>;
  /**
   * Изменить язык
   * @param body (optional)
   * @return OK
   */
  changeLanguage(body?: LangDto | undefined): Promise<ResultType>;
  /**
   * Вывод баланса пользователя
   * @param body (optional)
   * @return OK
   */
  withdraw(body?: WithdrawDto | undefined): Promise<ResultType>;
}

export class Client implements IClient {
  protected instance: AxiosInstance;
  protected baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(baseUrl?: string, instance?: AxiosInstance) {
    this.instance = instance || axios.create();

    this.baseUrl = baseUrl ?? "";
  }

  /**
   * ѕополнение баланса пользовател¤
   * @param body (optional)
   * @return OK
   */
  deposit(
    body?: DepositDto | undefined,
    cancelToken?: CancelToken
  ): Promise<ResultType> {
    let url_ = this.baseUrl + "/api/Deposit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processDeposit(_response);
      });
  }

  protected processDeposit(response: AxiosResponse): Promise<ResultType> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (const k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      return Promise.resolve<ResultType>(response.data);
    } else if (status === 400) {
      const _responseText = response.data;
      let result400: any = null;
      let resultData400 = _responseText;
      result400 = JSON.parse(resultData400);
      return throwException(
        "Bad Request",
        status,
        _responseText,
        _headers,
        result400
      );
    } else if (status === 500) {
      const _responseText = response.data;
      let result500: any = null;
      let resultData500 = _responseText;
      result500 = JSON.parse(resultData500);
      return throwException(
        "Internal Server Error",
        status,
        _responseText,
        _headers,
        result500
      );
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<ResultType>(null as any);
  }

  /**
   * Получить данные для панели пользователя
   * @return OK
   */
  getUserPanelData(
    cancelToken?: CancelToken
  ): Promise<ApiResponse<PanelDataVm>> {
    let url_ = this.baseUrl + "/api/Game/GetUserPanelData";
    url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "text/plain",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processGetUserPanelData(_response);
      });
  }

  protected processGetUserPanelData(
    response: AxiosResponse
  ): Promise<ApiResponse<PanelDataVm>> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (const k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      return Promise.resolve<ApiResponse<PanelDataVm>>(response.data);
    } else if (status === 400) {
      const _responseText = response.data;
      let result400: any = null;
      let resultData400 = _responseText;
      result400 = JSON.parse(resultData400);
      return throwException(
        "Bad Request",
        status,
        _responseText,
        _headers,
        result400
      );
    } else if (status === 500) {
      const _responseText = response.data;
      let result500: any = null;
      let resultData500 = _responseText;
      result500 = JSON.parse(resultData500);
      return throwException(
        "Internal Server Error",
        status,
        _responseText,
        _headers,
        result500
      );
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<ApiResponse<PanelDataVm>>(null as any);
  }

  /**
   * Получить список активных паков юзера (для страницы с крючками)
   * @return OK
   */
  getActiveUsersPacks(
    cancelToken?: CancelToken
  ): Promise<ApiResponse<UsersPacksVm>> {
    let url_ = this.baseUrl + "/api/Game/GetActiveUsersPacks";
    url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "text/plain",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processGetActiveUsersPacks(_response);
      });
  }

  protected processGetActiveUsersPacks(
    response: AxiosResponse
  ): Promise<ApiResponse<UsersPacksVm>> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (const k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      return Promise.resolve<ApiResponse<UsersPacksVm>>(response.data);
    } else if (status === 400) {
      const _responseText = response.data;
      let result400: any = null;
      let resultData400 = _responseText;
      result400 = JSON.parse(resultData400);
      return throwException(
        "Bad Request",
        status,
        _responseText,
        _headers,
        result400
      );
    } else if (status === 500) {
      const _responseText = response.data;
      let result500: any = null;
      let resultData500 = _responseText;
      result500 = JSON.parse(resultData500);
      return throwException(
        "Internal Server Error",
        status,
        _responseText,
        _headers,
        result500
      );
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<ApiResponse<UsersPacksVm>>(null as any);
  }

  /**
   * Получить список паков доступных юзеру для покупки (для магазина)
   * @return OK
   */
  getPacks(cancelToken?: CancelToken): Promise<ApiResponse<PackVm[]>> {
    let url_ = this.baseUrl + "/api/Game/GetPacks";
    url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "text/plain",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processGetPacks(_response);
      });
  }

  protected processGetPacks(
    response: AxiosResponse
  ): Promise<ApiResponse<PackVm[]>> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (const k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      return Promise.resolve<ApiResponse<PackVm[]>>(response.data);
    } else if (status === 400) {
      const _responseText = response.data;
      let result400: any = null;
      let resultData400 = _responseText;
      result400 = JSON.parse(resultData400);
      return throwException(
        "Bad Request",
        status,
        _responseText,
        _headers,
        result400
      );
    } else if (status === 500) {
      const _responseText = response.data;
      let result500: any = null;
      let resultData500 = _responseText;
      result500 = JSON.parse(resultData500);
      return throwException(
        "Internal Server Error",
        status,
        _responseText,
        _headers,
        result500
      );
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<ApiResponse<PackVm[]>>(null as any);
  }

  /**
   * Получить данные по рефам
   * @return OK
   */
  getRefData(cancelToken?: CancelToken): Promise<ApiResponse<RefDataVm>> {
    let url_ = this.baseUrl + "/api/Game/GetRefData";
    url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "text/plain",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processGetRefData(_response);
      });
  }

  protected processGetRefData(
    response: AxiosResponse
  ): Promise<ApiResponse<RefDataVm>> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (const k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      return Promise.resolve<ApiResponse<RefDataVm>>(response.data);
    } else if (status === 400) {
      const _responseText = response.data;
      let result400: any = null;
      let resultData400 = _responseText;
      result400 = JSON.parse(resultData400);
      return throwException(
        "Bad Request",
        status,
        _responseText,
        _headers,
        result400
      );
    } else if (status === 500) {
      const _responseText = response.data;
      let result500: any = null;
      let resultData500 = _responseText;
      result500 = JSON.parse(resultData500);
      return throwException(
        "Internal Server Error",
        status,
        _responseText,
        _headers,
        result500
      );
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<ApiResponse<RefDataVm>>(null as any);
  }

  /**
   * Получить рыбок текущего пользователя (доступных и забранных)
   * @return OK
   */
  getUserFishes(cancelToken?: CancelToken): Promise<ApiResponse<FishesVm>> {
    let url_ = this.baseUrl + "/api/Game/GetUserFishes";
    url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "text/plain",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processGetUserFishes(_response);
      });
  }

  protected processGetUserFishes(
    response: AxiosResponse
  ): Promise<ApiResponse<FishesVm>> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (const k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      return Promise.resolve<ApiResponse<FishesVm>>(response.data);
    } else if (status === 400) {
      const _responseText = response.data;
      let result400: any = null;
      let resultData400 = _responseText;
      result400 = JSON.parse(resultData400);
      return throwException(
        "Bad Request",
        status,
        _responseText,
        _headers,
        result400
      );
    } else if (status === 500) {
      const _responseText = response.data;
      let result500: any = null;
      let resultData500 = _responseText;
      result500 = JSON.parse(resultData500);
      return throwException(
        "Internal Server Error",
        status,
        _responseText,
        _headers,
        result500
      );
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<ApiResponse<FishesVm>>(null as any);
  }

  /**
   * Получить таблицу лидеров
   * @return OK
   */
  getLeaderboard(cancelToken?: CancelToken): Promise<ApiResponse<UserVm[]>> {
    let url_ = this.baseUrl + "/api/Game/GetLeaderboard";
    url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "text/plain",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processGetLeaderboard(_response);
      });
  }

  protected processGetLeaderboard(
    response: AxiosResponse
  ): Promise<ApiResponse<UserVm[]>> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (const k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      return Promise.resolve<ApiResponse<UserVm[]>>(response.data);
    } else if (status === 400) {
      const _responseText = response.data;
      let result400: any = null;
      let resultData400 = _responseText;
      result400 = JSON.parse(resultData400);
      return throwException(
        "Bad Request",
        status,
        _responseText,
        _headers,
        result400
      );
    } else if (status === 500) {
      const _responseText = response.data;
      let result500: any = null;
      let resultData500 = _responseText;
      result500 = JSON.parse(resultData500);
      return throwException(
        "Internal Server Error",
        status,
        _responseText,
        _headers,
        result500
      );
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<ApiResponse<UserVm[]>>(null as any);
  }

  /**
   * Получить сегодняшнюю награду
   * @return OK
   */
  claimTodayReward(cancelToken?: CancelToken): Promise<ApiResponse<number>> {
    let url_ = this.baseUrl + "/api/Game/ClaimTodayReward";
    url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
      method: "POST",
      url: url_,
      headers: {
        Accept: "text/plain",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processClaimTodayReward(_response);
      });
  }

  protected processClaimTodayReward(
    response: AxiosResponse
  ): Promise<ApiResponse<number>> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (const k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      return Promise.resolve<ApiResponse<number>>(response.data);
    } else if (status === 400) {
      const _responseText = response.data;
      let result400: any = null;
      let resultData400 = _responseText;
      result400 = JSON.parse(resultData400);
      return throwException(
        "Bad Request",
        status,
        _responseText,
        _headers,
        result400
      );
    } else if (status === 500) {
      const _responseText = response.data;
      let result500: any = null;
      let resultData500 = _responseText;
      result500 = JSON.parse(resultData500);
      return throwException(
        "Internal Server Error",
        status,
        _responseText,
        _headers,
        result500
      );
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<ApiResponse<number>>(null as any);
  }

  /**
   * Купить пак
   * @param body (optional)
   * @return OK
   */
  buyPack(
    body?: BuyDto | undefined,
    cancelToken?: CancelToken
  ): Promise<ApiResponse<string>> {
    let url_ = this.baseUrl + "/api/Game/BuyPack";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processBuyPack(_response);
      });
  }

  protected processBuyPack(
    response: AxiosResponse
  ): Promise<ApiResponse<string>> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (const k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      return Promise.resolve<ApiResponse<string>>(response.data);
    } else if (status === 400) {
      const _responseText = response.data;
      let result400: any = null;
      let resultData400 = _responseText;
      result400 = JSON.parse(resultData400);
      return throwException(
        "Bad Request",
        status,
        _responseText,
        _headers,
        result400
      );
    } else if (status === 500) {
      const _responseText = response.data;
      let result500: any = null;
      let resultData500 = _responseText;
      result500 = JSON.parse(resultData500);
      return throwException(
        "Internal Server Error",
        status,
        _responseText,
        _headers,
        result500
      );
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<ApiResponse<string>>(null as any);
  }

  /**
   * Изменить язык
   * @param body (optional)
   * @return OK
   */
  changeLanguage(
    body?: LangDto | undefined,
    cancelToken?: CancelToken
  ): Promise<ResultType> {
    let url_ = this.baseUrl + "/api/Game/ChangeLanguage";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processChangeLanguage(_response);
      });
  }

  protected processChangeLanguage(
    response: AxiosResponse
  ): Promise<ResultType> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (const k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      return Promise.resolve<ResultType>(response.data);
    } else if (status === 400) {
      const _responseText = response.data;
      let result400: any = null;
      let resultData400 = _responseText;
      result400 = JSON.parse(resultData400);
      return throwException(
        "Bad Request",
        status,
        _responseText,
        _headers,
        result400
      );
    } else if (status === 500) {
      const _responseText = response.data;
      let result500: any = null;
      let resultData500 = _responseText;
      result500 = JSON.parse(resultData500);
      return throwException(
        "Internal Server Error",
        status,
        _responseText,
        _headers,
        result500
      );
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<ResultType>(null as any);
  }

  /**
   * Вывод баланса пользователя
   * @param body (optional)
   * @return OK
   */
  withdraw(
    body?: WithdrawDto | undefined,
    cancelToken?: CancelToken
  ): Promise<ResultType> {
    let url_ = this.baseUrl + "/api/Game/Withdraw";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processWithdraw(_response);
      });
  }

  protected processWithdraw(response: AxiosResponse): Promise<ResultType> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (const k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      return Promise.resolve<ResultType>(response.data);
    } else if (status === 400) {
      const _responseText = response.data;
      let result400: any = null;
      let resultData400 = _responseText;
      result400 = JSON.parse(resultData400);
      return throwException(
        "Bad Request",
        status,
        _responseText,
        _headers,
        result400
      );
    } else if (status === 500) {
      const _responseText = response.data;
      let result500: any = null;
      let resultData500 = _responseText;
      result500 = JSON.parse(resultData500);
      return throwException(
        "Internal Server Error",
        status,
        _responseText,
        _headers,
        result500
      );
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<ResultType>(null as any);
  }
}

export interface ActionResult {}

/** Купить пак */
export interface BuyDto {
  /** ИД пака */
  packId?: string;
}

/** ѕополнение баланса пользовател¤ */
export interface DepositDto {
  /** јдрес куда присылать */
  username?: string | undefined;
  /** сколько тонов начислить на внутренний баланс */
  amount?: number;
}

export interface ErrorDto {
  readonly code?: string | undefined;
  readonly description?: string | undefined;
  type?: ErrorType;
}

export enum ErrorType {
  _0 = 0,
  _1 = 1,
  _2 = 2,
  _3 = 3,
}

export interface FishVm {
  id: number;
  name: string | undefined;
  claimed: boolean;
}

export interface FishesVm {
  nextFishDate?: Date;
  fishes?: FishVm[] | undefined;
  userFishesCount?: number;
  isTodayFishClaimed?: boolean;
}


/** Изменить язык */
export interface LangDto {
  /** Код языка */
  language?: string | undefined;
}

export interface PackVm {
  packId?: string;
  name?: string | undefined;
  price?: number;
  earn?: number;
  isAvailable?: boolean;
}

export interface PanelDataVm {
  bobberValue?: number;
  fishValue?: number;
  packsCount?: number;
  balance?: number;
  languageCode?: string | undefined;
}

export interface ProblemDetails {
  type?: string | undefined;
  title?: string | undefined;
  status?: number | undefined;
  detail?: string | undefined;
  instance?: string | undefined;

  [key: string]: any;
}

export interface ProblemDetailsActionResult {
  result?: ActionResult;
  value?: ProblemDetails;
}

export interface RefDataVm {
  youInvitedCount?: number;
  leadeboard?: UserVm[] | undefined;
  refUrl?: string | undefined;
}

export interface ResultType {
  readonly isSuccess?: boolean;
  readonly isFailure?: boolean;
  error?: ErrorDto;
}

export interface UserVm {
  name?: string | undefined;
  score?: number;
  avatarUrl?: string | undefined;
}

export interface UsersPacksVm {
  names?: string[] | undefined;
}

export interface WebAppData {
  data?: string | undefined;
  buttonText?: string | undefined;
}

export interface WebAppInfo {
  url?: string | undefined;
}

/** Вывод баланса пользователя */
export interface WithdrawDto {
  /** сколько тонов с баланса выводить */
  amount?: number;
  /** Адрес куда присылать */
  address?: string | undefined;
}
export class ApiException extends Error {
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

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): any {
  if (result !== null && result !== undefined) throw result;
  else throw new ApiException(message, status, response, headers, null);
}

function isAxiosError(obj: any): obj is AxiosError {
  return obj && obj.isAxiosError === true;
}
