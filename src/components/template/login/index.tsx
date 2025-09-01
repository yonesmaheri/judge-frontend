"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/lib/services/auth";
import { useRouter } from "next/navigation";
import LoginPageTemplate from "./form";

const loginSchema = z.object({
  username: z.string().min(3, "Enter username"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLogin();

  const onSubmit = (values: LoginFormData) => {
    mutate(values, {
      onSuccess: async (data) => {
        await fetch("back/auth/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: data.token }),
        });
        router.push("/");
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-1/2">
      <div className="w-96 bg-white shadow-md rounded-xl p-6">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <LoginPageTemplate
            form={form}
            isPending={isPending}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
