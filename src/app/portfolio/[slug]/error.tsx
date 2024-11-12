// src/app/portfolio/[slug]/error.tsx
'use client';

import { AlertCircle } from "lucide-react";

export default function PortfolioError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
      <p className="text-slate-600 mb-4 text-center max-w-md">
        {error.message || "We're having trouble loading this project. Please try again."}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => window.location.href = '/portfolio'}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back to Portfolio
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
