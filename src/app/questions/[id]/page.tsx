"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import apiCall from "@/lib/api";
import { useQuestion, useSubmissions } from "@/lib/services/questions";
import SubmissionForm from "@/components/template/questions/submitForm";
import { DataTable } from "@/components/module/table";
import { columns } from "@/components/template/questions/columns";

const getMe = async () => {
  const res = await apiCall.get("/auth/me");
  return res.data;
};

export default function QuestionDetailPage() {
  const { id } = useParams();
  const { data: question, isLoading, isError } = useQuestion(id as string);
  const { data: user } = useQuery({ queryKey: ["me"], queryFn: getMe });
  const { data: submissions, isLoading: isLoadingSubmissions } = useSubmissions(
    id as string
  );

  if (isLoading) return <p className="text-center">در حال بارگذاری...</p>;
  if (isError)
    return <p className="text-center text-red-500">خطا در دریافت سوال</p>;

  return (
    <div className="max-w-[1280px] container mx-auto py-8">
      {user ? (
        <Tabs dir="rtl" defaultValue="question">
          <TabsList>
            <TabsTrigger value="question">سوال</TabsTrigger>
            <TabsTrigger value="submissions">ارسال‌های من</TabsTrigger>
          </TabsList>

          {/* تب سوال */}
          <TabsContent value="question">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">
                  {question.title}
                </CardTitle>
                <Badge
                  variant={
                    question.difficulty === "EASY"
                      ? "outline"
                      : question.difficulty === "MEDIUM"
                      ? "default"
                      : "destructive"
                  }
                >
                  {question.difficulty}
                </Badge>
              </CardHeader>
              <CardContent>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: question.description }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* تب ارسال‌های کاربر */}
          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle>ارسال‌های من</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingSubmissions ? (
                  <p>در حال بارگذاری...</p>
                ) : submissions?.length ? (
                  <DataTable columns={columns} data={submissions} />
                ) : (
                  <p>ارسالی وجود ندارد.</p>
                )}

                <SubmissionForm questionId={id as string} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        // فقط سوال اگر لاگین نیست
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">
              {question.title}
            </CardTitle>
            <Badge
              variant={
                question.difficulty === "EASY"
                  ? "outline"
                  : question.difficulty === "MEDIUM"
                  ? "default"
                  : "destructive"
              }
            >
              {question.difficulty}
            </Badge>
          </CardHeader>
          <CardContent>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: question.text }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
