import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Contexts/useAuth";

type Props = { children: React.ReactNode };

const ProtectedRoutes = (props: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn());

  return isLoggedIn() ? (
    <>{props.children}</>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
    // <>{props.children}</>
  );
};

export default ProtectedRoutes;
