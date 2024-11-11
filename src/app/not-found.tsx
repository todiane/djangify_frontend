import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-xl mb-8">Page not found</p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        Return Home
      </Link>
    </div>
  );
}
