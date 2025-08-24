import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiCall from "../api";
import { LoginType, RegisterType } from "@/types/auth";
import { toast } from "react-hot-toast";

const login = async (data: LoginType) => {
  const res = await apiCall.post("/auth/login", data);
  return res.data;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("ورود با موفقیت انجام شد", {
        position: "bottom-center",
      });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError(error: any) {
      toast.error(error.response.data.message, {
        position: "bottom-center",
      });
    },
  });
};



const register = async (data: RegisterType) => {
  const res = await apiCall.post("/auth/register", data);
  return res.data;
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("ثبت نام با موفقیت انجام شد", {
        position: "bottom-center",
      });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError(error: any) {
      toast.error(error.response.data.message, {
        position: "bottom-center",
      });
    },
  });
};



const fetchMe = async () => {
  const res = await apiCall.get("/auth/me");
  return res.data;
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: false,
  });
};