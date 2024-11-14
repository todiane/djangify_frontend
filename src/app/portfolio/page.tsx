// src/app/portfolio/page.tsx
import { Suspense } from 'react';
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { LoadingPortfolio } from "@/components/portfolio/LoadingPortfolio";
import { portfolioApi } from '@/lib/api/portfolio';
import Layout from '@/components/layout/Layout';
import { AlertCircle } from "lucide-react";

export const metadata = {
  title: 'Portfolio | Djangify',
  description: 'Explore my portfolio of web development projects',
};

export const revalidate = 3600; // Revalidate every hour

export default function PortfolioPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl text-center font-bold tracking-tight">Portfolio</h1>
            <p className="text-gray-600 text-center">
              Explore my latest web development projects and experiments.
            </p>
          </div>

          <Suspense fallback={<LoadingPortfolio />}>
            <PortfolioContent />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}

// src/app/portfolio/page.tsx
async function PortfolioContent() {
  try {
    // Updated method name
    const response = await portfolioApi.getProjects();

    if (!response.data.results.length) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600">No projects available at the moment.</p>
        </div>
      );
    }

    return <PortfolioGrid initialItems={response.data.results} technologies={[]} />;
  } catch (error) {
    return (
      <div className="flex items-center gap-2 p-4 text-red-800 bg-red-50 rounded-md mt-6">
        <AlertCircle className="h-4 w-4" />
        <p>Failed to load portfolio projects. Please try again later.</p>
      </div>
    );
  }
}
