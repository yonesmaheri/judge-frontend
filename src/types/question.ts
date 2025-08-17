export type CreateQuestionInput = {
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  testCases?: { input: string; expected: string }[];
}