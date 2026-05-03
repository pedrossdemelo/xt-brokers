import { UserProvider } from "context/UserContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "styles/globals.css";
import App from "./App";

const urlTheme = new URLSearchParams(window.location.search).get("theme");
if (urlTheme === "dark") document.documentElement.classList.add("dark");
else if (urlTheme === "light")
  document.documentElement.classList.remove("dark");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
