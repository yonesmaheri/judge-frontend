"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuestions } from "@/lib/services/questions";
import Link from "next/link";

export default function QuestionsPage() {
  const { data, isLoading, isError } = useQuestions();

  if (isLoading) return <p className="text-center">در حال بارگذاری...</p>;
  if (isError)
    return <p className="text-center text-red-500">خطا در دریافت سوالات</p>;

  return (
    <div dir="rtl" className="container mx-auto py-8 space-y-4">
      <div className="grid gap-4 max-w-[1280px] mx-auto">
        <h1 className="text-2xl font-bold mb-6">لیست سوالات</h1>
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
