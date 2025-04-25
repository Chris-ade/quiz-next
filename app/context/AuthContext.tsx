"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../utils/useToast";
import {
  setUserData,
  deleteData,
  getUserData,
  deleteToken,
  getToken,
  setToken,
} from "../utils/vault";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { UserDataProps } from "../types/user";

interface AuthContextType {
  user: UserDataProps;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Modify your AuthContext initialization to avoid undefined.
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default AuthContext;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toastSuccess, toastError } = useToast();
  const navigate = useRouter();

  const loginUser = async (email: string, password: string): Promise<any> => {
    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        await setToken(data.tokens);
        const userData = jwtDecode(data.tokens.access);
        await setUserData(userData);
        setUser(userData);
        navigate.push("/");
        toastSuccess("Login successful.");
      } else {
        toastError(data.message || "Invalid credentials.");
        throw new Error(data.message || "Login failed.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<any> => {
    try {
      const response = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        navigate.push("/login");
        toastSuccess("Registration successful.");
      } else {
        toastError(data.detail || "Registration failed.");
        throw new Error(data.detail || "Registration error.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const logoutUser = async (): Promise<void> => {
    await deleteToken();
    await deleteData();
    setUser(null);
    navigate.push("/login");
    toastSuccess("You have been logged out.");
  };

  const checkUser = async () => {
    try {
      const storedUser = await getUserData();
      const tokens = await getToken();

      if (storedUser) {
        setUser(storedUser);
      } else if (tokens?.access) {
        const decoded = jwtDecode<{ exp: number }>(tokens.access);
        const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1;

        if (!isExpired) {
          setUser(decoded);
        } else {
          setUser(null);
          await deleteToken();
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    const checkUserAsync = async () => {
      await checkUser();
    };
    checkUserAsync();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, registerUser, loginUser, logoutUser }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
