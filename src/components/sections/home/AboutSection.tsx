// src/components/sections/home/AboutSection.tsx
"use client";

import { CldImage } from 'next-cloudinary';

export const AboutSection = () => {
  return (
    <section id="about" className="py-12">
      <div className="w-full mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">About Me</h1>

        <div className="bg-white rounded-lg shadow-md mb-8 p-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Hi, I&apos;m Diane</h2>
            <p>
              I am a full-stack developer leveraging Django, Django Rest Framework, Next.js, FastAPI and React. I have a passion for creating
              elegant, minimalistic, AI powered solutions to complex problems. I love building modern web applications that deliver great user experiences because they are useful and easy to use.
            </p>
            <p className="text-lg text-muted-foreground mb-8 mt-4">
              I am embracing my <span className="font-bold text-xl">&quot;Build and Bloom Era&quot;</span>, and after over 10 years of working freelance with WordPress I have taken on a new challenge of selling what I build. While I don&apos;t work with clients anymore, I never say never!
            </p>
            <p>
              When I am not coding, you will find me writing content, creating paperback notebooks - I still love paper!, and focusing on my passion for personal development and &quot;trying&quot; to keep fit.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <CldImage
              src="dianecorriette-cartoon"  // Remove the .png extension when using with CldImage
              alt="Diane Corriette"
              width={580}
              height={320}
              className="rounded-lg mb-4"
              crop="fill"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Python and AI</li>
              <li>• Django and Flask</li>
              <li>• React and Next.js</li>
              <li>• TypeScript</li>
              <li>• PostgreSQL</li>
              <li>• APIs</li>
              <li>• Poetry</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Experience</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Full-Stack Development</li>
              <li>• Frontend Architecture</li>
              <li>• Backend Development</li>
              <li>• Database Design</li>
              <li>• WordPress Development</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};