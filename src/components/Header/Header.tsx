import { Box } from "@mui/material";
import { Link } from "components/Link";
import React from "react";
import { AccountRoutes } from "views/Account/constants/routes";
import "./styles.scss";

export const Header: React.FC = () => {
  return (
    <Box component="header" className="header">
      <Box component="nav">
        <Link primary to={AccountRoutes.accountHome}>Account</Link>
        <Link primary to="/characters">Characters</Link>
        <Link primary to="/pvp">PvP</Link>
        <Link primary to="/wvw">WvW</Link>
        <Link primary to="/worldbosses">WorldBosses</Link>
      </Box>
      <Box component="nav">
        <Link to={AccountRoutes.bank}>Bank</Link>
        <Link to={AccountRoutes.inventory}>Inventory</Link>
        <Link to={AccountRoutes.materials}>Materials</Link>
      </Box>
    </Box>
  );
};
