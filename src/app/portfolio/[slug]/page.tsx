// src/app/portfolio/[slug]/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ProjectView } from '@/components/portfolio/ProjectView';
import { portfolioApi } from '@/lib/api/portfolio';
import { AlertCircle } from "lucide-react";
import { generatePortfolioJsonLd } from '@/lib/metadata';
import { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const response = await portfolioApi.getProjectBySlug(params.slug);
    const project = response.data;

    return {
      title: `${project.title} | Portfolio`,
      description: project.meta_description || project.short_description,
      openGraph: {
        title: `${project.title} | Portfolio`,
        description: project.meta_description || project.short_description,
        images: project.featured_image ? [project.featured_image] : undefined,
        type: 'article',
        url: `/portfolio/${project.slug}`
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/portfolio/${project.slug}`
      }
    };
  } catch {
    return {
      title: 'Project Not Found | Portfolio',
      description: 'The requested project could not be found.',
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/portfolio/not-found`
      }
    };
  }
}

export default function ProjectPage({ params }: PageProps) {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-8" />
        <div className="aspect-video bg-gray-200 rounded mb-8" />
      </div>
    }>
      <ProjectContent slug={params.slug} />
    </Suspense>
  );
}

async function ProjectContent({ slug }: { slug: string }) {
  try {
    const response = await portfolioApi.getProjectBySlug(slug);
    const project = response.data;

    if (!project) {
      notFound();
    }

    // Generate structured data
    const jsonLd = generatePortfolioJsonLd(project);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProjectView project={project} />
      </>
    );
  } catch (error: unknown) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 p-4 text-red-800 bg-red-50 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <p>Failed to load project details. Please try again later.</p>
          <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }
}
