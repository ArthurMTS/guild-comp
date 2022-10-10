import { Link as RRDLink, LinkProps, useLocation } from "react-router-dom";
import React from "react";
import "./styles.scss";

export const Link: React.FC<LinkProps> = ({ children, to }) => {
  const { pathname } = useLocation();
  
  return (
    <RRDLink
      className={pathname.includes(to.toString()) ? "selected" : ""}
      to={to}
    >
      {children}
    </RRDLink>
  );
};