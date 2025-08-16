"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubmissions, useSubmitAnswer } from "@/lib/services/questions";

type FormSchema = {
  file: FileList;
};

export default function SubmitForm({ questionId }: { questionId: string }) {
  const { control, handleSubmit } = useForm<FormSchema>();
  const { mutate, isPending } = useSubmitAnswer();

  const onSubmit = (data: FormSchema) => {
    if (!data.file || !data.file[0]) return;
    mutate({ questionId, file: data.file[0] });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="file"
        control={control}
        defaultValue={undefined}
        render={({ field }) => (
          <Input
            type="file"
            accept=".py"
            onChange={(e) => field.onChange(e.target.files)}
          />
        )}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "در حال ارسال..." : "ارسال جواب"}
      </Button>
    </form>
  );
}
