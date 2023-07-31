import React from "react";
import ReactDOM from "react-dom/client";
import {
  SisenseContextProvider,
  ThemeProvider,
} from "@sisense/sdk-ui";
import Layout from "./Layout.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GettingStarted from "./pages/GettingStarted.tsx";
import Charts from "./pages/Charts.tsx";
import ChartsConnected from "./pages/ChartsConnected.tsx";
import Filters from "./pages/Filters.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import "./index.css";

const sisenseContextProviderArgs = () => {
  const baseOptions = {
    url: import.meta.env.VITE_APP_SISENSE_URL,
    defaultDataSource: "Sample ECommerce",
  }
  const username = import.meta.env.VITE_APP_SISENSE_USERNAME;
  const password = import.meta.env.VITE_APP_SISENSE_PASSWORD;
  const wat = import.meta.env.VITE_APP_SISENSE_WAT;
  const token = import.meta.env.VITE_APP_SISENSE_API_TOKEN;
  const ssoEnabled = import.meta.env.VITE_APP_SISENSE_SSO_ENABLED;

  if (ssoEnabled) {
    return { ...baseOptions, ssoEnabled: ssoEnabled?.toLowercase() === 'true' };
  } else if (wat) {
    return { ...baseOptions, wat }
  } else if (token) {
    return { ...baseOptions, token }
  } else if (username && password) {
    return { ...baseOptions, username, password }
  } else {
    return baseOptions;
  }
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SisenseContextProvider
      {...sisenseContextProviderArgs()}
    >
      <ThemeProvider
        theme={{
          typography: {
            fontFamily: "Optimistic",
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<GettingStarted />} />
              <Route path="charts" element={<Charts />} />
              <Route path="charts-connected" element={<ChartsConnected />} />
              <Route path="filters" element={<Filters />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </SisenseContextProvider>
  </React.StrictMode>
);
