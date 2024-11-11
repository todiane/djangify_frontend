// components/error/index.tsx
'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { AlertTriangle, XCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

interface ErrorEvent {
  message?: string;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      setHasError(true);
      setError(error instanceof Error ? error : new Error(error.message));
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error?.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Reload Page
        </button>
      </div>
    );
  }

  return children;
};

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => (
  <div className="flex items-center justify-between p-4 mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
    <div className="flex items-center">
      <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
      <p className="text-red-700 dark:text-red-200">{message}</p>
    </div>
    {onClose && (
      <button
        onClick={onClose}
        className="text-red-500 hover:text-red-700 transition-colors"
      >
        <XCircle className="w-5 h-5" />
      </button>
    )}
  </div>
);

export { ErrorBoundary, ErrorAlert };
