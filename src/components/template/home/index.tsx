"use client";
import RightCol from "./rightCol";
import LeftCol from "./leftCol";

export default function HomePage() {
  return (
    <section className="lg:max-w-[1280px] max-w-[95%] mx-auto flex flex-col md:flex-row items-center justify-center px-6 md:px-12">
      <LeftCol />

      <RightCol />
    </section>
  );
}
