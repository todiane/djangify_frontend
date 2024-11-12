// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import BlogPost from './BlogPost';
import { blogApi } from '@/lib/api/blog';
import { generateBlogJsonLd } from '@/lib/metadata';
import * as metadataUtils from '@/lib/metadata';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { data: post } = await blogApi.getBlogPost(params.slug);

    return metadataUtils.generateMetadata({
      title: post.title,
      description: post.excerpt || post.short_description || '',
      image: post.featured_image,
      type: 'article',
      path: `/blog/${post.slug}`
    });
  } catch (error) {
    return metadataUtils.generateMetadata({
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
      path: `/blog/${params.slug}`
    });
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  if (!params.slug) {
    notFound();
  }

  try {
    const { data: post } = await blogApi.getBlogPost(params.slug);

    if (!post) {
      notFound();
    }

    const jsonLd = generateBlogJsonLd(post);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BlogPost post={post} />
      </>
    );
  } catch (error) {
    notFound();
  }
}
