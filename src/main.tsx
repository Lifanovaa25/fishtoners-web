import { createRoot } from "react-dom/client";
import { Buffer } from "buffer";
import App from "app";

import video from "./app/assets/videoBg.mp4";

import "shared/config/i18n";
import { Provider } from "react-redux";
import { setupStore } from "store/store";

const container = document.getElementById("root");
const root = createRoot(container!);

const store = setupStore();

if (typeof window !== "undefined") {
  (window as any).Buffer = Buffer;
}
root.render(
  <Provider store={store}>
    <div className="app">
      <video autoPlay loop muted className="bgvideo" id="bgvideo">
        <source src={video} type="video/mp4"></source>
      </video>
      <App />
    </div>
  </Provider>
);
