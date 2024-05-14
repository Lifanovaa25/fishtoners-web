import { WebAppProvider, MainButton, BackButton } from '@vkruglikov/react-telegram-web-app';
import { ReactNode } from 'react';

export const withTelegram = (component: () => ReactNode) => {
    return(
        <WebAppProvider
            options={{
                smoothButtonsTransition: true,
            }}
        >
            {component()}
            <MainButton />
            <BackButton />
        </WebAppProvider> 
    )
}