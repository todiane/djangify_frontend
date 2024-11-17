// components/sections/home/HomeHero.tsx
import { ArrowRight, BookOpen } from "lucide-react";

const HomeHero = () => {
  return (
    <section className="w-full bg-slate-50">
      <div className="min-h-[40vh] flex flex-col justify-center items-center text-center px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-[#403F3F] mb-6">
          Welcome to <span className="text-[#0C8C9D]">Djangify</span>
        </h1>
        <p className="text-lg md:text-xl text-[#737373] max-w-2xl mx-auto mb-8">
          Delving into web development with Django, Flask, AI, APIs, and Next.js to create practical and effective solutions.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/portfolio"
            className="inline-flex items-center px-4 py-2 bg-[#0C8C9D] text-white rounded-md hover:bg-[#0C8C9D]/90 transition-colors"
          >
            View Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a
            href="/blog"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Read Blog
            <BookOpen className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
