import { useMutation } from "@tanstack/react-query";
import apiCall from "../api";
import { LoginType } from "@/types/login";

const login = async (data: LoginType) => {
  const res = await apiCall.post("/auth/login", data);
  return res;
};

export const useLogin = () => {
  return useMutation({mutationFn:login})
};
