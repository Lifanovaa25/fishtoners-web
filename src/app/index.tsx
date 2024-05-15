import 'react-toastify/scss/main.scss';
import './styles/index.scss';

import { withProviders, WithInitData } from './providers';
import { lazy } from 'react';

const DashBoardPage = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return import('page');
});

const App = () => (
    <WithInitData>
        
        <DashBoardPage />
    </WithInitData>
)

export default withProviders(App);
