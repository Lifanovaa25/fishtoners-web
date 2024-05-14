import { createRoot } from 'react-dom/client';
import { Provider } from "effector-react";
import { allSettled, fork } from 'effector';

import App from 'app';
import { appStarted } from 'shared/config/init';

import video from './app/assets/videoBg.mp4'

import 'shared/config/i18n';

const container = document.getElementById('root');
const root = createRoot(container!);

const scope = fork();

allSettled(appStarted, { scope }).catch(() =>
  console.warn("Failed to start the app"),
);

root.render(
  <Provider value={scope}>
    <div className='app'>
      <video autoPlay loop muted className="bgvideo" id="bgvideo">
        <source src={video} type="video/mp4"></source>
      </video>
      <App />
    </div>
  </Provider>
);
