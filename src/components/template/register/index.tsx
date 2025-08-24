"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/lib/services/auth";
import { useRouter } from "next/navigation";
import RegisterPageTemplate from "./form";

const registerSchema = z.object({
  name: z.string().min(3, "Enter your full name"),
  username: z.string().min(3, "Username must contain at least 3 characters"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {

  const router = useRouter()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useRegister();

  const onSubmit = (values: RegisterFormData) => {
    mutate(values,{
      onSuccess() {
        router.push('/')
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-1/2">
      <div className="w-96 bg-white shadow-md rounded-xl p-6">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <RegisterPageTemplate
            form={form}
            isPending={isPending}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
