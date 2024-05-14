import { useEffect, useState } from 'react';

// Хелп-функции для ленивой подгрузки моков
export const delayGetMock = async (ms:number = 2000) => await new Promise(
  (resolve: (_: void) => void) => setTimeout(resolve, ms)
);

export const useLoadingMock = (timeOut:number = 2000) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    delayGetMock(timeOut).finally(() => setIsLoading(false));
  }, [timeOut]);

  return isLoading;
};
