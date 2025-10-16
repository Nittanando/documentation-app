import React, { useState } from "react";
import DynamicSidebar from "./features/sidebar/components/DynamicSidebar";
import MarkdownViewer from "./features/viewer/components/MarkdownViewer";
// import ThemeToggle from "./features/theme/components/ThemeToggle";
import useExternalContent from "./features/content/hooks/useExternalContent";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [activePath, setActivePath] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Use external content hook for loading markdown files
  const { content, loading, error } = useExternalContent(repoUrl, activePath);

  const handleItemClick = (path, sourceRepoUrl) => {
    setActivePath(path);
    if (sourceRepoUrl) {
      setRepoUrl(sourceRepoUrl);
    }
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleRepoUrlChange = (newRepoUrl) => {
    setRepoUrl(newRepoUrl);
    setActivePath(null); // Clear active path when changing repository
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 sticky top-0 z-40">
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
              Dynamic Documentation
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            {/* Repository URL Input */}
            <div className="hidden md:flex items-center space-x-2">
              <label
                htmlFor="repo-input"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                Repository:
              </label>
              <input
                id="repo-input"
                type="text"
                value={repoUrl}
                onChange={(e) => handleRepoUrlChange(e.target.value)}
                placeholder="https://github.com/user/repo"
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 w-64"
              />
            </div>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <DynamicSidebar
          onItemClick={handleItemClick}
          activePath={activePath}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          repoUrl={repoUrl}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto p-6 lg:p-8">
            {!activePath ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Welcome to Dynamic Documentation
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Enter a GitHub repository URL above to automatically generate
                  documentation navigation from the repository structure.
                </p>

                {!repoUrl ? (
                  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 max-w-2xl mx-auto">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      No Repository Selected
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      To get started, enter a public GitHub repository URL in
                      the input field above. The app will automatically:
                    </p>
                    <ul className="text-left text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span>Analyze the repository structure</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span>
                          Generate navigation from directories and files
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span>
                          Render markdown content with syntax highlighting
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span>Support Mermaid diagrams and tables</span>
                      </li>
                    </ul>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <p className="text-blue-800 dark:text-blue-300 text-sm">
                        <strong className="text-blue-900 dark:text-blue-200">
                          Example:
                        </strong>
                        <code className="ml-2 text-blue-700 dark:text-blue-400">
                          https://github.com/user/repo
                        </code>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-blue-800 dark:text-blue-300 text-sm">
                      <strong className="text-blue-900 dark:text-blue-200">
                        Current Repository:
                      </strong>
                      <br />
                      <span className="text-blue-700 dark:text-blue-400">
                        {repoUrl}
                      </span>
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 text-xs mt-2">
                      Select a file from the sidebar to view its content
                    </p>
                  </div>
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
