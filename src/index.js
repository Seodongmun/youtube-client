import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./assets/reset.css";
import "./assets/dark.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ThemeProvider>
);
