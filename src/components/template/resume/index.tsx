"use client";
import PersonalInfo from "./personalInfo";
import Experience from "./experience";
import Skills from "./skills";
import About from "./about";

function ResumeTemplate() {
  return (
    <div className="max-w-[95%] lg:max-w-[1280px] mx-auto py-8 space-y-4">
      <PersonalInfo /> 
      <About/>
      <Experience />

      <Skills />
    </div>
  );
}

export default ResumeTemplate;
