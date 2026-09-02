import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import "./index.css";

import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";

import { GeneralContextProvider } from "./components/GeneralContext";

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>

        <Route
          path="/*"
          element={
            <ProtectedRoute>

              <GeneralContextProvider>
                <Home />
              </GeneralContextProvider>

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);