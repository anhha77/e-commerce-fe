import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

function RoleRequire({ children }) {
  const { user } = useAuth();

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default RoleRequire;
