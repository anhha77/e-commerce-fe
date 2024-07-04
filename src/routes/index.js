import Reacy from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import AuthRequire from "./AuthRequire";
import useAuth from "../hooks/useAuth";

function Router() {
  const location = useLocation();
  const { user } = useAuth();
}
