import "react-toastify/scss/main.scss";
import "./styles/index.scss";

import { withProviders } from "./providers";
import { lazy } from "react";

const DashBoardPage = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return import("page");
});

const App = () => <DashBoardPage />;

export default withProviders(App);
