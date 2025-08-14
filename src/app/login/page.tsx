"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/lib/services/login";
import LoginPageTemplate from "@/components/template/login";

const loginSchema = z.object({
  username: z.string().min(3, "وارد کردن نام کاربری الزامی است"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {mutate, isPending} = useLogin()

  const onSubmit = (values: LoginFormData) => {
    mutate(values);
  };

  return (
    <div dir="rtl" className="flex justify-center items-center h-screen">
      <div className="w-96 bg-white shadow-md rounded p-6">
        <LoginPageTemplate form={form} isPending={isPending} onSubmit={onSubmit}/>
      </div>
    </div>
  );
}
