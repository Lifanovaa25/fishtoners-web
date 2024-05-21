import axios, { Method } from "axios";
import type { AxiosInstance, CancelToken } from "axios";
import { ApiResponse, ResultType, handleRequest } from "./axiosClient";

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
   * пополнение баланса пользовател¤
   * @param body (optional)
   * @return OK
   */
  async deposit(
    body?: DepositDto,
    cancelToken?: CancelToken
  ): Promise<ResultType> {
    const url = `${this.baseUrl}/api/Deposit`;
    const options = {
      data: JSON.stringify(body),
      method: "POST" as Method,
      url,
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
      cancelToken,
    };
    return handleRequest<ResultType>(this.instance, options);
  }

  /**
   * Получить данные для панели пользователя
   * @return OK
   */
  async getUserPanelData(
    cancelToken?: CancelToken
  ): Promise<ApiResponse<PanelDataVm>> {
    const url = `${this.baseUrl}/api/Game/GetUserPanelData`;
    const options = {
      method: "GET" as Method,
      url,
      headers: { Accept: "text/plain" },
      cancelToken,
    };
    return handleRequest<ApiResponse<PanelDataVm>>(this.instance, options);
  }

  /**
   * Получить список активных паков юзера (для страницы с крючками)
   * @return OK
   */
  async getActiveUsersPacks(
    cancelToken?: CancelToken
  ): Promise<ApiResponse<UsersPacksVm>> {
    const url = `${this.baseUrl}/api/Game/GetActiveUsersPacks`;
    const options = {
      method: "GET" as Method,
      url,
      headers: { Accept: "text/plain" },
      cancelToken,
    };
    return handleRequest<ApiResponse<UsersPacksVm>>(this.instance, options);
  }

  /**
   * Получить список паков доступных юзеру для покупки (для магазина)
   * @return OK
   */
  async getPacks(cancelToken?: CancelToken): Promise<ApiResponse<PackVm[]>> {
    const url = `${this.baseUrl}/api/Game/GetPacks`;
    const options = {
      method: "GET" as Method,
      url,
      headers: { Accept: "text/plain" },
      cancelToken,
    };
    return handleRequest<ApiResponse<PackVm[]>>(this.instance, options);
  }

  /**
   * Получить данные по рефам
   * @return OK
   */
  async getRefData(cancelToken?: CancelToken): Promise<ApiResponse<RefDataVm>> {
    const url = `${this.baseUrl}/api/Game/GetRefData`;
    const options = {
      method: "GET" as Method,
      url,
      headers: { Accept: "text/plain" },
      cancelToken,
    };
    return handleRequest<ApiResponse<RefDataVm>>(this.instance, options);
  }

  /**
   * Получить рыбок текущего пользователя (доступных и забранных)
   * @return OK
   */
  async getUserFishes(
    cancelToken?: CancelToken
  ): Promise<ApiResponse<FishesVm>> {
    const url = `${this.baseUrl}/api/Game/GetUserFishes`;
    const options = {
      method: "GET" as Method,
      url,
      headers: { Accept: "text/plain" },
      cancelToken,
    };
    return handleRequest<ApiResponse<FishesVm>>(this.instance, options);
  }

  /**
   * Получить таблицу лидеров
   * @return OK
   */
  async getLeaderboard(
    cancelToken?: CancelToken
  ): Promise<ApiResponse<UserVm[]>> {
    const url = `${this.baseUrl}/api/Game/GetLeaderboard`;
    const options = {
      method: "GET" as Method,
      url,
      headers: { Accept: "text/plain" },
      cancelToken,
    };
    return handleRequest<ApiResponse<UserVm[]>>(this.instance, options);
  }

  /**
   * Получить сегодняшнюю награду
   * @return OK
   */
  async claimTodayReward(
    cancelToken?: CancelToken
  ): Promise<ApiResponse<number>> {
    const url = `${this.baseUrl}/api/Game/ClaimTodayReward`;
    const options = {
      method: "POST" as Method,
      url,
      headers: { Accept: "text/plain" },
      cancelToken,
    };
    return handleRequest<ApiResponse<number>>(this.instance, options);
  }

  /**
   * Купить пак
   * @param body (optional)
   * @return OK
   */
  async buyPack(
    body?: BuyDto,
    cancelToken?: CancelToken
  ): Promise<ApiResponse<string>> {
    const url = `${this.baseUrl}/api/Game/BuyPack`;
    const options = {
      data: JSON.stringify(body),
      method: "POST" as Method,
      url,
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
      cancelToken,
    };
    return handleRequest<ApiResponse<string>>(this.instance, options);
  }

  /**
   * Изменить язык
   * @param body (optional)
   * @return OK
   */
  async changeLanguage(
    body?: LangDto,
    cancelToken?: CancelToken
  ): Promise<ResultType> {
    const url = `${this.baseUrl}/api/Game/ChangeLanguage`;
    const options = {
      data: JSON.stringify(body),
      method: "POST" as Method,
      url,
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
      cancelToken,
    };
    return handleRequest<ResultType>(this.instance, options);
  }

  /**
   * Вывод баланса пользователя
   * @param body (optional)
   * @return OK
   */
  async withdraw(
    body?: WithdrawDto,
    cancelToken?: CancelToken
  ): Promise<ApiResponse<number>> {
    const url = `${this.baseUrl}/api/Game/Withdraw`;
    const options = {
      data: JSON.stringify(body),
      method: "POST" as Method,
      url,
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
      cancelToken,
    };
    return handleRequest<ApiResponse<number>>(this.instance, options);
  }
}

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
  feeInPercents: number;
  bobberValue: number;
  fishValue: number;
  packsCount: number;
  balance: number;
  languageCode: string | undefined;
  userId: number;
}

export interface RefDataVm {
  youInvitedCount?: number;
  leadeboard?: UserVm[] | undefined;
  refUrl?: string | undefined;
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
