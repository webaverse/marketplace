import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { walletConnected } = useAuth()
  return walletConnected ? <Component /> : <Navigate to={'/connect-wallet'} />
}
