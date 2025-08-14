"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/questions").then((res) => {
      setQuestions(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Questions</h1>
      <ul className="space-y-2">
        {questions.map((q: any) => (
          <li key={q._id} className="bg-white p-4 rounded shadow">
            <a href={`/questions/${q._id}`} className="text-blue-500">
              {q.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
