"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      // If user is not authenticated, redirect to login page
      router.push("/login");
    }
  }, [user, router]);

  // If the user is logged in, render the children (nested components)
  if (!user) {
    return null; // or a loading indicator
  }

  return <>{children}</>;
};

export default PrivateRoute;
