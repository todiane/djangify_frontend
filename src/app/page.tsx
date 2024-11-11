import PageTransition from '@/components/transitions/PageTransition';
import Layout from '@/components/layout/Layout';
import HomeHero from '@/components/sections/home/HomeHero';
import FeatureCards from '@/components/sections/home/FeatureCards';
import LatestPosts from '@/components/sections/home/LatestPosts';

export default function HomePage() {
  return (
    <Layout>
      <PageTransition>
        <div className="min-h-[calc(100vh-64px)]">
          <HomeHero />
          <div className="container mx-auto px-4">
            <section className="py-12">
              <div className="container">
                <h1 className="text-4xl font-bold mb-6">Welcome to Djangify</h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Transform your Django projects with automated structure generation.
                </p>
              </div>
            </section>
            <FeatureCards />
            <LatestPosts />
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
}