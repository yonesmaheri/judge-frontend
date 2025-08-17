"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { useCreateQuestion } from "@/lib/services/questions";
import { useRouter } from "next/navigation";
const QuillEditor = dynamic(() => import("@/components/module/htmlEditor"), {
  ssr: false,
});

const schema = z.object({
  title: z.string().min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),
  description: z.string().min(1, "توضیح سوال الزامی است"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  testCases: z
    .array(
      z.object({
        input: z.string().min(1, "ورودی الزامی است"),
        expected: z.string().min(1, "خروجی الزامی است"),
      })
    )
    .min(1, "حداقل یک تست کیس نیاز است"),
});

type FormData = z.infer<typeof schema>;

export default function CreateQuestionForm() {
  const { mutate, isPending } = useCreateQuestion();
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "EASY",
      testCases: [{ input: "", expected: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "testCases",
  });

  const onSubmit = async (data: FormData) => {
    mutate(data, {
      onSuccess() {
        router.push("/questions");
      },
    });
  };

  return (
    <Card className="max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>ایجاد سوال جدید</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" dir="rtl">
          <div>
            <label>عنوان سوال</label>
            <Input {...register("title")} />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label>توضیحات سوال</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <QuillEditor value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label>سطح سختی</label>
            <Controller
              control={control}
              name="difficulty"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب سطح سختی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EASY">آسان</SelectItem>
                    <SelectItem value="MEDIUM">متوسط</SelectItem>
                    <SelectItem value="HARD">سخت</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.difficulty && (
              <p className="text-red-500">{errors.difficulty.message}</p>
            )}
          </div>

          <div>
            <label>تست کیس‌ها</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2 items-center">
                <Input
                  {...register(`testCases.${index}.input`)}
                  placeholder="ورودی"
                />
                <Input
                  {...register(`testCases.${index}.expected`)}
                  placeholder="خروجی"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  حذف
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => append({ input: "", expected: "" })}
            >
              افزودن تست کیس
            </Button>
          </div>

          <Button type="submit">ایجاد سوال</Button>
        </form>
      </CardContent>
    </Card>
  );
}
