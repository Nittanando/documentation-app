import React, { useState } from "react";
import Sidebar from "./features/sidebar/components/Sidebar";
import MarkdownViewer from "./features/viewer/components/MarkdownViewer";
import ThemeToggle from "./features/theme/components/ThemeToggle";
import useMarkdownContent from "./features/viewer/hooks/useMarkdownContent";
import RepositorySelector from "./features/content/components/RepositorySelector";
import ExternalContentViewer from "./features/content/components/ExternalContentViewer";

function App() {
  const [activePath, setActivePath] = useState("/docs/intro.md");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [externalContent, setExternalContent] = useState(null);
  const { content, loading, error } = useMarkdownContent(activePath);

  const handleItemClick = (path) => {
    setActivePath(path);
    setExternalContent(null); // Clear external content when switching to local content
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleExternalContentSelect = (repoUrl, filePath) => {
    setExternalContent({ repoUrl, filePath });
    setActivePath("/external"); // Set to external path
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Documentation
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <Sidebar
          onItemClick={handleItemClick}
          activePath={activePath}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="max-w-4xl mx-auto p-6 lg:p-8">
            {activePath === "/external" ? (
              <div className="space-y-6">
                <RepositorySelector
                  onContentSelect={handleExternalContentSelect}
                />
                {externalContent && (
                  <ExternalContentViewer
                    repoUrl={externalContent.repoUrl}
                    filePath={externalContent.filePath}
                  />
                )}
              </div>
            ) : loading ? (
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
            ) : error ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">Error loading content</span>
                </div>
                <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
              </div>
            ) : (
              <MarkdownViewer content={content} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
