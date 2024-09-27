import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { publicRoutes } from "./routes/index.ts";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from "./layouts/MainLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <MainLayout>
                    <Page />
                    </MainLayout>
                }
              />
            )
          })}
        </Routes>
      </Router>
    <App />
  </StrictMode>
);
