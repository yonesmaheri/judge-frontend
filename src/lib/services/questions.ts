import { useQuery } from "@tanstack/react-query";
import apiCall from "../api";

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
