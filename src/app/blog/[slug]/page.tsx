// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import BlogPost from '@/components/blog/BlogPost';
import { blogApi } from '@/lib/api/blog';
import { generateBlogJsonLd } from '@/lib/metadata';
import * as metadataUtils from '@/lib/metadata';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const response = await blogApi.getBlogPost(params.slug);
    const post = response.data;

    return metadataUtils.generateMetadata({
      title: post.title,
      description: post.excerpt || post.short_description || '',
      image: post.featured_image,
      type: 'article',
      path: `/blog/${post.slug}`
    });
  } catch {
    return metadataUtils.generateMetadata({
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
      path: `/blog/${params.slug}`
    });
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  if (!params.slug) {
    notFound();
  }

  try {
    const response = await blogApi.getBlogPost(params.slug);
    const post = response.data;

    if (!post) {
      notFound();
    }

    const jsonLd = generateBlogJsonLd(post);

    return (
      <div className="container mx-auto px-4 py-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BlogPost post={post} />
      </div>
    );
  } catch {
    notFound();
  }
}
