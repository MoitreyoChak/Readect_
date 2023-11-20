import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";

import { AppProvider } from "./context/AppContext";
import { ProfileProvider } from "./context/ProfileContext";
import { SingleProvider } from "./context/SingleContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <SingleProvider>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </SingleProvider>
  </AppProvider>
);
