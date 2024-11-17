import PageTransition from '@/components/transitions/PageTransition';
import HomeHero from '@/components/sections/home/HomeHero';
import FeatureCards from '@/components/sections/home/FeatureCards';
import LatestPosts from '@/components/sections/home/LatestPosts';

export default function HomePage() {
  return (
    <PageTransition>
      <div className="w-full">
        <HomeHero />
        <div className="container mx-auto px-4">
          <section className="py-12">
            <div className="container">
              <h1 className="text-4xl font-bold mb-6">
                Building Practical Solutions with Django and Next.js
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Here, you&apos;ll find a selection of projects crafted with Django, Flask, AI, APIs, and Next.js. These projects reflect my approach to web development—focused on practicality and functionality. Offering pre-built digital solutions that serve a range of business needs, each product is crafted with care and available for purchase. If you see something that resonates with your business needs, feel free to get in touch.
              </p>
            </div>
          </section>
          <FeatureCards />
          <LatestPosts />
        </div>
      </div>
    </PageTransition>
  );
}