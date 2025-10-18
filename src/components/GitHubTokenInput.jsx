import React, { useState, useEffect } from "react";

function GitHubTokenInput({ onTokenSet }) {
  const [token, setToken] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Check if token is already set
    const existingToken = localStorage.getItem("github_token");
    if (existingToken && existingToken !== "ghp_your_token_here") {
      setToken(existingToken);
      setIsValid(true);
      if (onTokenSet) onTokenSet(existingToken);
    }
  }, [onTokenSet]);

  const handleTokenChange = (e) => {
    const newToken = e.target.value;
    setToken(newToken);

    // Basic validation
    const isValidToken = newToken.startsWith("ghp_") && newToken.length > 20;
    setIsValid(isValidToken);
  };

  const handleSaveToken = () => {
    if (isValid) {
      localStorage.setItem("github_token", token);
      window.GITHUB_TOKEN = token;
      if (onTokenSet) onTokenSet(token);
      alert(
        "GitHub token saved successfully! You can now use the app with higher rate limits."
      );
    }
  };

  const handleRemoveToken = () => {
    localStorage.removeItem("github_token");
    delete window.GITHUB_TOKEN;
    setToken("");
    setIsValid(false);
    if (onTokenSet) onTokenSet(null);
  };

  if (!isVisible) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-blue-800 dark:text-blue-200 font-medium">
              🚀 Boost Performance
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
              Add a GitHub token for 5,000 requests/hour instead of 60
            </p>
          </div>
          <button
            onClick={() => setIsVisible(true)}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
          >
            Add Token
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
      <h4 className="text-blue-800 dark:text-blue-200 font-medium mb-3">
        🔑 GitHub Token Setup
      </h4>

      <div className="space-y-3">
        <div>
          <label className="block text-blue-700 dark:text-blue-300 text-sm font-medium mb-1">
            Personal Access Token
          </label>
          <input
            type="password"
            value={token}
            onChange={handleTokenChange}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            className="w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          {token && (
            <p
              className={`text-xs mt-1 ${
                isValid
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {isValid
                ? "✅ Valid token format"
                : "❌ Invalid token format (should start with ghp_)"}
            </p>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleSaveToken}
            disabled={!isValid}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Save Token
          </button>
          <button
            onClick={handleRemoveToken}
            className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
          >
            Remove
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
        </div>

        <div className="text-xs text-blue-600 dark:text-blue-400">
          <p>
            <strong>How to get a token:</strong>
          </p>
          <ol className="list-decimal list-inside mt-1 space-y-1">
            <li>
              Go to{" "}
              <a
                href="https://github.com/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                GitHub Settings → Tokens
              </a>
            </li>
            <li>Click "Generate new token (classic)"</li>
            <li>Select "public_repo" scope</li>
            <li>Copy the token and paste it above</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default GitHubTokenInput;
