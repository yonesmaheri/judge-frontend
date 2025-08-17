"use client";

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function HtmlEditor({ value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic"],
            ["code-block"],
            ["link", "image"],
            [{ align: [] }],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "bullet" }],
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }], // dropdown with defaults from theme
            [{ font: [] }],
          ],
        },
      });

      quillRef.current.on("text-change", () => {
        onChange(quillRef.current!.root.innerHTML);
      });

      // مقدار اولیه
      quillRef.current.root.innerHTML = value || "";
    }
  }, [editorRef]);

  return <div ref={editorRef} className="min-h-[200px] bg-white" />;
}
