import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "views/Home";

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);