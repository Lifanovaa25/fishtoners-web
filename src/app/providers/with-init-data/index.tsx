import { ReactNode, useEffect } from "react"
import { useInitData } from '@vkruglikov/react-telegram-web-app';
import { settedInitDataUnsafe } from "shared/config/telegram";
import { useUnit } from "effector-react";

interface WithInitDataProps {
    children: ReactNode
}

export const WithInitData = ({children}: WithInitDataProps) => {
    const [initDataUnsafe] = useInitData();
    const [
        onSettedInitDataUnsafe,
    ] = useUnit([
        settedInitDataUnsafe,
    ]);

    useEffect(() => {
        // anisa - 7154391685
        // nn - 687384357
        // const MOCK_TG_USER: WebAppUser = {
        //     "id": 1193926429,
        //     "first_name": "Kamil",
        //     "last_name": "",
        //     "username": "kamilturk",
        //     "language_code": "en",
        //     "allows_write_to_pm": true
        // }

        if(initDataUnsafe?.user ) {
            onSettedInitDataUnsafe(initDataUnsafe?.user);
            // onSettedInitDataUnsafe(MOCK_TG_USER);
        }

    }, [initDataUnsafe]);

    return children
}