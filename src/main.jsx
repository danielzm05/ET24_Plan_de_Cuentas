import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AccountProvider } from "./context/AccountContext.jsx";
import { SchoolProvider } from "./context/SchoolContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SchoolProvider>
          <AccountProvider>
            <App />
          </AccountProvider>
        </SchoolProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
