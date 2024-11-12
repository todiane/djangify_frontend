// src/app/blog/[slug]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
      <p className="text-gray-600 mb-6">
        The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/blog"
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Return to Blog
      </Link>
    </div>
  );
}