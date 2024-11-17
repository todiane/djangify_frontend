// app/about/page.tsx
import { Metadata } from 'next';
import CTASection from '@/components/sections/common/CTASection';
import Image from 'next/image';

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
    <>
      <div className="container mx-auto px-4 py-12">
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
                I am embracing my <span className="font-bold text-xl style={{ color: '#0C8C9D' }}">"Build and Bloom Era"</span>, and after over 10 years of working freelance with WordPress I have taken on a new challenge of selling what I build. While I don't work with clients anymore, I never say never!
              </p>
              <p>
                When I am not coding, you will find me writing content, creating paperback notebooks (I still love paper!), and focusing on my passion for personal development and "trying" to keep fit.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="/images/dianecorriette-cartoon.png"
                alt="A description of the image"
                width={580} // Set the desired width
                height={320} // Set the desired height
                className="rounded-lg mb-4"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Python & AI</li>
                <li>• Django & Flask</li>
                <li>• React & Next.js</li>
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
      </div>
      <CTASection
        title="Need Your Questions Answered?"
        description="If you want to ask about any of my products and how they can help your business, please get in touch."
        buttonText="Get Started"
        buttonLink="/contact"
      />
    </>
  );
}