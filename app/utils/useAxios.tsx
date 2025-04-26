"use client";

import axios from "axios";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { getToken, getUserData, updateToken, updateUserData } from "./vault";
import { jwtDecode } from "jwt-decode";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const useAxios = () => {
  const { setUser } = useAuth();

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL,
    });

    instance.interceptors.request.use(async (req: any) => {
      const authTokens = await getToken();

      if (!authTokens) {
        window.location.href = "/login";
        return Promise.reject(new Error("No token available"));
      }

      const user = await getUserData();
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) {
        req.headers.Authorization = `Bearer ${authTokens.access}`;
        return req;
      }

      window.location.href = "/login";
    });

    return instance;
  }, [setUser]);

  return axiosInstance;
};

export default useAxios;
