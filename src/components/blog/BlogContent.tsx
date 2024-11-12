// src/components/blog/BlogContent.tsx

interface BlogContentProps {
  content: string;
  className?: string;
}

export function BlogContent({ content, className = '' }: BlogContentProps) {
  return (
    <div className={`prose prose-slate max-w-none ${className}
      prose-headings:font-semibold prose-headings:tracking-tight
      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
      prose-img:rounded-lg prose-pre:bg-gray-900 prose-pre:text-gray-100
      ${className}`}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}