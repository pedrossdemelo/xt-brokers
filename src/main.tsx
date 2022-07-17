import { PaperProvider } from "context/PaperContext";
import { UserProvider } from "context/UserContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementsByTagName("body")[0]).render(
  <React.StrictMode>
    <PaperProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </PaperProvider>
  </React.StrictMode>
);
