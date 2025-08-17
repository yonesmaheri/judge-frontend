import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiCall from "../api";
import { CreateQuestionInput } from "@/types/question";
import toast from "react-hot-toast";

const getQuestions = async () => {
  const res = await apiCall.get("/questions");
  return res.data;
};

export const useQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });
};

const getQuestion = async (id: string) => {
  const res = await apiCall.get(`/questions/${id}`);
  return res.data;
};

export const useQuestion = (id: string) => {
  return useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestion(id),
    enabled: !!id,
  });
};

const submitAnswer = async ({
  questionId,
  file,
}: {
  questionId: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("questionId", questionId);

  const res = await apiCall.post(
    `/questions/${questionId}/submissions`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

export const useSubmitAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
};

const getSubmissions = async (questionId: string) => {
  const res = await apiCall.get(`/questions/${questionId}/submissions`);
  return res.data;
};

export const useSubmissions = (questionId: string) => {
  return useQuery({
    queryKey: ["submissions", questionId],
    queryFn: () => getSubmissions(questionId),
    enabled: !!questionId,
  });
};


const createQuestion = async (data: CreateQuestionInput) => {
  const res = await apiCall.post("/questions", data);
  return res.data;
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      toast.success("سوال جدید ایجاد شد", {
        position: "bottom-center",
      });
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};