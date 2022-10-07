import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { AccountRoutes } from "views/Account/constants/routes";
import "./styles.scss";

export const Header: React.FC = () => {
  return (
    <Box component="header" className="header">
      <Box component="nav">
        <Link to={AccountRoutes.accountHome}>Account</Link>
        <Link to="/">Characters</Link>
        <Link to="/">PvP</Link>
        <Link to="/">WvW</Link>
        <Link to="/">WorldBosses</Link>
      </Box>
      <Box component="nav">
        <Link to={AccountRoutes.bank}>Bank</Link>
        <Link to={AccountRoutes.inventory}>Inventory</Link>
        <Link to={AccountRoutes.materials}>Materials</Link>
      </Box>
    </Box>
  );
};
