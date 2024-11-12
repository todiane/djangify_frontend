// src/app/portfolio/[slug]/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ProjectView } from './ProjectView';
import { portfolioApi } from '@/lib/api/portfolio';
import Layout from '@/components/layout/Layout';
import { AlertCircle } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const response = await portfolioApi.getProjectBySlug(params.slug);
    const project = response.data;

    return {
      title: `${project.title} | Portfolio`,
      description: project.meta_description || project.short_description,
    };
  } catch {
    return {
      title: 'Project Not Found | Portfolio',
      description: 'The requested project could not be found.',
    };
  }
}

export default function ProjectPage({ params }: PageProps) {
  return (
    <Layout>
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8" />
          <div className="aspect-video bg-gray-200 rounded mb-8" />
        </div>
      }>
        <ProjectContent slug={params.slug} />
      </Suspense>
    </Layout>
  );
}

async function ProjectContent({ slug }: { slug: string }) {
  try {
    const response = await portfolioApi.getProjectBySlug(slug);
    const project = response.data;

    if (!project) {
      notFound();
    }

    return <ProjectView project={project} />;
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 p-4 text-red-800 bg-red-50 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <p>Failed to load project details. Please try again later.</p>
        </div>
      </div>
    );
  }
}