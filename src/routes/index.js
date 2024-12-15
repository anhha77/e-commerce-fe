import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/user/MainLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AuthRequire from "./AuthRequire";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminHomePage from "../pages/admin/AdminHomePage";
import RoleRequire from "./RoleRequire";
import AdminMainLayout from "../layouts/admin/AdminMainLayout";
import CustomersPage from "../pages/admin/CustomersPage";
import CreateCustomersPage from "../pages/admin/CreateCustomerPage";
import ProfilePage from "../pages/ProfilePage";
import CustomerProfilePage from "../pages/admin/CustomerProfilePage";
import CategoryPage from "../pages/admin/CategoryPage";
import CreateCategoryPage from "../pages/admin/CreateCategoryPage";
import CategoryDetailPage from "../pages/admin/CategoryDetailPage";

export default function Router() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRequire>
              <MainLayout />
            </AuthRequire>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="users/me" element={<ProfilePage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AuthRequire>
              <RoleRequire>
                <AdminMainLayout />
              </RoleRequire>
            </AuthRequire>
          }
        >
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<CustomersPage />} />
          <Route path="create_user" element={<CreateCustomersPage />} />
          <Route path="users/:id" element={<CustomerProfilePage />} />
          <Route path="users/me" element={<ProfilePage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route
            path="categories/:categoryId"
            element={<CategoryDetailPage />}
          />

          <Route path="create_category" element={<CreateCategoryPage />} />
        </Route>

        <Route element={<BlankLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/admin" element={<AdminLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
