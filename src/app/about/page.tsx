// app/about/page.tsx
import { Metadata } from 'next';
import CTASection from '@/components/sections/common/CTASection';

export const metadata: Metadata = {
  title: 'About Me | Your Name',
  description: 'Learn more about my journey as a full-stack developer specializing in Django and React.',
  openGraph: {
    title: 'About Me | Your Name',
    description: 'Learn more about my journey as a full-stack developer specializing in Django and React.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <><div className="container mx-auto px-4 py-12">
      <div className="w-full mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">About Me</h1>

        <div className="bg-white rounded-lg shadow-md mb-8 p-6">
          <h2 className="text-2xl font-semibold mb-4">Hi, I&apos;m [Your Name]</h2>
          <p>
            15 NOVEMBER THIS IS NEW I am a full-stack developer specializing in Django and React. With a passion for creating
            elegant solutions to complex problems, I enjoy building modern web applications that
            deliver great user experiences.
          </p>
          <p>
            When I am not coding, you can find me exploring new technologies, contributing to open-source
            projects, or writing technical articles on my blog.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Skills</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Python & Django</li>
              <li>• React & Next.js</li>
              <li>• TypeScript</li>
              <li>• PostgreSQL</li>
              <li>• REST APIs</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Experience</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Full-Stack Development</li>
              <li>• Frontend Architecture</li>
              <li>• Backend Development</li>
              <li>• Database Design</li>
              <li>• API Development</li>
            </ul>
          </div>
        </div>
      </div>
    </div><CTASection
        title="Ready to launch your project?"
        description="Get started with our Django and React templates today."
        buttonText="Get Started"
        buttonLink="/contact" /></>
  );
}