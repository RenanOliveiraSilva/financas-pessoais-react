import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./main/App";
import { AuthProvider } from "./app/service/authContext";

const root = createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
