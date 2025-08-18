"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMe } from "@/lib/services/auth";
import { useQuestions } from "@/lib/services/questions";
import Link from "next/link";

export default function QuestionsPage() {
  const { data, isLoading, isError } = useQuestions();
  const { data: me } = useMe();

  if (isLoading) return <p className="text-center">در حال بارگذاری...</p>;
  if (isError)
    return <p className="text-center text-red-500">خطا در دریافت سوالات</p>;

  return (
    <div dir="rtl" className="container mx-auto py-8 space-y-4">
      <div className="grid gap-4 max-w-[1280px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold ">لیست سوالات</h1>
          {data && (
            <Button asChild>
              <Link href={"/questions/add"}> افزودن سوال جدید</Link>
            </Button>
          )}
        </div>
        {data?.map((q: any) => (
          <Link key={q.id} href={`/questions/${q.id}`}>
            <Card className="hover:shadow-lg transition cursor-pointer">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>{q.title}</CardTitle>
                <Badge
                  variant={
                    q.difficulty === "EASY"
                      ? "outline"
                      : q.difficulty === "MEDIUM"
                      ? "default"
                      : "destructive"
                  }
                >
                  {q.difficulty}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {q.text}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
