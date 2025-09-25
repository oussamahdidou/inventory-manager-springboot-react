import { createBrowserRouter } from "react-router-dom";
import CategoryPage from "../Pages/CategoryPage/CategoryPage";
import App from "../App";
import DashboardPage from "../Pages/DashboardPage/DashboardPage";
import StockPage from "../Pages/StockPage/StockPage";
import SupplierPage from "../Pages/SupplierPage/SupplierPage";
import EntryExitPage from "../Pages/EntryExitPage/EntryExitPage";
import InboxPage from "../Pages/InboxPage/InboxPage";
import NotFound from "../Pages/NotFound/NotFound";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoutes from "./ProtectedRoutes";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoutes>
            <DashboardPage></DashboardPage>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/stock",
        element: (
          <ProtectedRoutes>
            <StockPage></StockPage>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/Supplier",
        element: (
          <ProtectedRoutes>
            <SupplierPage></SupplierPage>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/category",
        element: (
          <ProtectedRoutes>
            <CategoryPage></CategoryPage>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/flux",
        element: (
          <ProtectedRoutes>
            <EntryExitPage></EntryExitPage>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/inbox",
        element: (
          <ProtectedRoutes>
            <InboxPage></InboxPage>
          </ProtectedRoutes>
        ),
      },
      { path: "/login", element: <LoginPage></LoginPage> },
      { path: "/register", element: <RegisterPage></RegisterPage> },
      { path: "*", element: <NotFound></NotFound> },
    ],
  },
]);
