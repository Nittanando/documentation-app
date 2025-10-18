import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useDynamicSidebar from "../hooks/useDynamicSidebar";

function DynamicSidebarItem({
  item,
  level = 0,
  onItemClick,
  activePath,
  repoUrl,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activePath === item.path;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      // For external content, we need to pass the repoUrl along with the path
      onItemClick(item.path, repoUrl);
    }
  };

  const paddingLeft = level * 16 + 12; // 16px per level + 12px base

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-between group relative ${
          isActive
            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-l-2 border-blue-500 shadow-sm"
            : "text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm"
        }`}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <span className="flex items-center space-x-3">
          {hasChildren && (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-4 h-4 flex items-center justify-center text-gray-400 dark:text-gray-500"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          )}
          <span className="text-lg opacity-80 group-hover:opacity-100 transition-opacity">
            {item.icon}
          </span>
          <span
            className={`text-sm font-medium truncate ${
              isActive ? "font-semibold" : "font-normal"
            }`}
          >
            {item.title}
          </span>
        </span>
      </button>

      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-1">
              {item.children.map((child, index) => (
                <DynamicSidebarItem
                  key={index}
                  item={child}
                  level={level + 1}
                  onItemClick={onItemClick}
                  activePath={activePath}
                  repoUrl={repoUrl}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DynamicSidebar({ onItemClick, activePath, isOpen, onClose, repoUrl }) {
  const { sidebarItems, loading, error } = useDynamicSidebar(repoUrl);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : -280,
        }}
        transition={{ type: "tween", duration: 0.3 }}
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 z-50 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:translate-x-0 lg:z-auto lg:block sidebar-desktop`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {repoUrl ? "Repository Docs" : "Navigation"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Repository Info */}
          {repoUrl && (
            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-300 dark:border-blue-800">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded flex items-center justify-center">
                  <span className="text-xs">📁</span>
                </div>
                <div>
                  <div className="text-xs text-blue-800 dark:text-blue-400 font-medium">
                    {repoUrl.split("/").pop()}
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-500 opacity-75">
                    GitHub Repository
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 text-red-500">⚠️</div>
                  <div className="flex-1">
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                      {error.includes("rate limit")
                        ? "GitHub API Rate Limit Exceeded"
                        : "Error loading repository structure"}
                    </p>
                    {error.includes("rate limit") && (
                      <div className="mt-2 text-xs text-red-500 dark:text-red-400">
                        <p>• Wait 5-10 minutes for the rate limit to reset</p>
                        <p>• Or use a GitHub token for higher limits</p>
                        <p>• Try refreshing the page in a few minutes</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : sidebarItems.length > 0 ? (
              <div className="space-y-1">
                {sidebarItems.map((item, index) => (
                  <DynamicSidebarItem
                    key={index}
                    item={item}
                    onItemClick={onItemClick}
                    activePath={activePath}
                    repoUrl={repoUrl}
                  />
                ))}
              </div>
            ) : !repoUrl ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🔗</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                  No repository selected
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs">
                  Enter a GitHub repository URL to generate navigation
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📂</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No markdown files found
                </p>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {repoUrl ? "Dynamic Navigation" : "Ready"}
              </div>
              <div className="flex items-center space-x-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    repoUrl ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {repoUrl ? "Live" : "Waiting"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default DynamicSidebar;
