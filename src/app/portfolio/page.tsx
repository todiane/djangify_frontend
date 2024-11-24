import { Suspense } from 'react';
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { LoadingPortfolio } from "@/components/portfolio/LoadingPortfolio";
import { AlertCircle } from "lucide-react";
import { headers } from 'next/headers';

export const metadata = {
  title: 'Portfolio | Djangify',
  description: 'Explore my portfolio of web development projects',
};

export const revalidate = 3600; // Revalidate every hour

async function getPortfolioData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const res = await fetch(`${baseUrl}/api/v1/portfolio/projects/`, {
      headers: {
        'Content-Type': 'application/json',
        // Add any necessary headers
        ...headers()
      },
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    throw error;
  }
}

export default function PortfolioPage() {
  return (
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
  );
}

async function PortfolioContent() {
  try {
    const data = await getPortfolioData();

    if (!data?.results || data.results.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600">No projects available at the moment.</p>
        </div>
      );
    }

    return <PortfolioGrid initialItems={data.results} technologies={[]} />;
  } catch (error) {
    return (
      <div className="flex items-center justify-center gap-2 p-4 text-red-800 bg-red-50 rounded-md mt-6">
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm font-medium">Failed to load portfolio projects. Please try again later.</p>
      </div>
    );
  }
}
