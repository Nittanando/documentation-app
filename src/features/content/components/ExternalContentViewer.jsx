import React from "react";
import MarkdownViewer from "../../viewer/components/MarkdownViewer";
import useExternalContent from "../hooks/useExternalContent";

function ExternalContentViewer({ repoUrl, filePath }) {
  const { content, loading, error } = useExternalContent(repoUrl, filePath);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">Error loading external content</span>
        </div>
        <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded">
          <p className="text-sm text-red-700 dark:text-red-300">
            <strong>Repository:</strong> {repoUrl}
          </p>
          <p className="text-sm text-red-700 dark:text-red-300">
            <strong>File:</strong> {filePath}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Repository Info Header */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">External Repository Content</span>
        </div>
        <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
          <p>
            <strong>Repository:</strong> {repoUrl}
          </p>
          <p>
            <strong>File:</strong> {filePath}
          </p>
        </div>
      </div>

      {/* Content */}
      <MarkdownViewer content={content} />
    </div>
  );
}

export default ExternalContentViewer;
