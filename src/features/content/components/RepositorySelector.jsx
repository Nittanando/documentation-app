import React, { useState } from "react";
import useRepositoryStructure from "../hooks/useRepositoryStructure";

function RepositorySelector({ onRepositorySelect, onContentSelect }) {
  const [repoUrl, setRepoUrl] = useState(
    "https://github.com/basharArif/sql-learning-path"
  );
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { structure, loading, error } = useRepositoryStructure(repoUrl);

  const handleRepositoryChange = (url) => {
    setRepoUrl(url);
    setSelectedModule(null);
    setSelectedFile(null);
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    setSelectedFile(null);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    onContentSelect(repoUrl, file.path);
  };

  const handleRepositorySelect = () => {
    onRepositorySelect(repoUrl);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        External Repository Integration
      </h3>

      {/* Repository URL Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Repository URL
        </label>
        <div className="flex space-x-2">
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => handleRepositoryChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="https://github.com/username/repository.git"
          />
          <button
            onClick={handleRepositorySelect}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Load
          </button>
        </div>
      </div>

      {/* Repository Structure */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Loading repository structure...
          </span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {structure && (
        <div className="space-y-4">
          {/* Modules */}
          {structure.modules.length > 0 && (
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                Modules ({structure.modules.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {structure.modules.map((module) => (
                  <button
                    key={module.path}
                    onClick={() => handleModuleSelect(module)}
                    className={`p-3 text-left rounded-md border transition-colors ${
                      selectedModule?.path === module.path
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {module.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {module.path}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Files */}
          {structure.files.length > 0 && (
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                Documentation Files ({structure.files.length})
              </h4>
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {structure.files.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => handleFileSelect(file)}
                    className={`w-full p-2 text-left rounded-md border transition-colors ${
                      selectedFile?.path === file.path
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {file.path}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Access to SQL Learning Path */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="text-md font-medium text-blue-900 dark:text-blue-100 mb-2">
          Quick Access: SQL Learning Path
        </h4>
        <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
          Access the comprehensive SQL tutorial with structured lessons and
          practical examples.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              handleRepositoryChange(
                "https://github.com/basharArif/sql-learning-path"
              )
            }
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            Load SQL Learning Path
          </button>
          <button
            onClick={() =>
              onContentSelect(
                "https://github.com/basharArif/sql-learning-path",
                "README.md"
              )
            }
            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
          >
            View README
          </button>
          <button
            onClick={() =>
              onContentSelect(
                "https://github.com/basharArif/sql-learning-path",
                "learning-path.md"
              )
            }
            className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600"
          >
            Learning Path
          </button>
        </div>
      </div>
    </div>
  );
}

export default RepositorySelector;
