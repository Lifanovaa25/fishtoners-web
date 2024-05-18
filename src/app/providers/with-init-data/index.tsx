import { ReactNode, useEffect } from "react"
import { WebAppUser } from '@vkruglikov/react-telegram-web-app';
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { appSlice } from "store/reducers/appSlice";

interface WithInitDataProps {
    children: ReactNode
}

export const WithInitData = ({children}: WithInitDataProps) => {
    const { initDataUnsafe } = useAppSelector((state) => state.appSlice);
    const { setInitDataUnsafe } = appSlice.actions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        // anisa - 7154391685
        // nn - 687384357
         const MOCK_TG_USER: WebAppUser = {
             "id": 1193926429,
             "first_name": "Kamil",
             "last_name": "",
             "username": "kamilturk",
             "language_code": "en",
             "allows_write_to_pm": true
         }

        if(initDataUnsafe?.user ) {
            //onSettedInitDataUnsafe(initDataUnsafe?.user);
             dispatch(setInitDataUnsafe(MOCK_TG_USER));
        }

    }, [initDataUnsafe]);

    return children
}