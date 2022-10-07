import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccountRoutes } from "views/Account/constants/routes";
import { Home as Account } from "views/Account/pages/Home";
import { Home } from "views/Home";

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path={AccountRoutes.accountHome}
        element={<Account />}
      />
    </Routes>
  </BrowserRouter>
);
