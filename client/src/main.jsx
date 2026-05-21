import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/auth/AuthContext";
import {ToastProvider} from "./context/ToastContext";

import "./styles/theme.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/pokedex.css";
import "./styles/types.css";
import "./styles/auth.css";
import "./styles/dashboard.css";
import "./styles/toast.css"

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
          <App />
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);