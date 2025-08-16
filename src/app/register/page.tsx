"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/lib/services/auth";
import RegisterPageTemplate from "@/components/template/register";
import Link from "next/link";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(3, "وارد کردن نام الزامی است"),
  username: z.string().min(3, "وارد کردن نام کاربری الزامی است"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
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
    <div dir="rtl" className="flex justify-center items-center h-screen">
      <div className="w-96 bg-white shadow-md rounded p-6">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <RegisterPageTemplate
            form={form}
            isPending={isPending}
            onSubmit={onSubmit}
          />
          <div>
            حساب کاربری دارید؟
            <Link href={"/login"}>وارد شوید</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
