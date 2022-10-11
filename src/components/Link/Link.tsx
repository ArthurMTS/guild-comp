import { Link as RRDLink, LinkProps as RRDLinkProps, useLocation } from "react-router-dom";
import React from "react";
import "./styles.scss";

interface LinkProps extends RRDLinkProps {
  primary?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  children,
  to,
  primary = false
}) => {
  const { pathname } = useLocation();
  const paths = pathname.split("/").slice(1);
  const selected = primary ?
    to.toString().includes(paths[0]) :
    to.toString().includes(paths[1]);
  
  return (
    <RRDLink
      className={selected ? "selected" : ""}
      to={to}
    >
      {children}
    </RRDLink>
  );
};
