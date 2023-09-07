import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createRoot } from "react-dom/client";

document.addEventListener("DOMContentLoaded", () => {
  let container = document.getElementById("root");
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
