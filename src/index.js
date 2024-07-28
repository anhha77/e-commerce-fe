import React from "react";

import App from "./App";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
