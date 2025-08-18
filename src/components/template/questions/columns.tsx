"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import ShowTests from "./showTests";

export type Submission = {
  id: number;
  filePath: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  successRate: number;
  createdAt: string;
  results: [];
};

export const columns: ColumnDef<Submission>[] = [
  {
    accessorKey: "filePath",
    header: "نام فایل",
    cell: ({ row }) => {
      const file = row.original.filePath?.split("/").pop();
      return <span className="font-medium">{file}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant="outline"
          className={
            status === "PENDING"
              ? "bg-yellow-200 text-yellow-800"
              : status === "SUCCESS"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "successRate",
    header: "درصد موفقیت",
    cell: ({ row }) => {
      const { status, successRate } = row.original;
      if (status === "PENDING") {
        return <span className="text-xs text-yellow-600">در حال بررسی...</span>;
      }
      return (
        <div className="flex items-center gap-2 w-[160px]">
          <Progress value={successRate} className="h-2 bg-red-200" />
          <span className="text-xs">{successRate}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ارسال",
    cell: ({ row }) => {
      return (
        <span className="text-xs text-muted-foreground">
          {new Date(row.original.createdAt).toLocaleString("fa-IR")}
        </span>
      );
    },
  },
  {
    id: "results",
    header: "نتایج تست‌ها",
    cell: ({ row }) => {
      const results = row.original.results as any[] | null;
      if (!results) {
        return <span className="text-xs text-gray-500">تستی وجود ندارد</span>;
      }

      return <ShowTests results={results} />;
    },
  },
];
