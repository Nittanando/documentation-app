import { useState, useEffect } from "react";

function useRepositoryStructure(repoUrl) {
  const [structure, setStructure] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!repoUrl) {
      setStructure(null);
      return;
    }

    const loadRepositoryStructure = async () => {
      setLoading(true);
      setError(null);

      try {
        // Convert GitHub URL to API URL
        let cleanRepoUrl = repoUrl;

        // Remove .git suffix if present
        if (cleanRepoUrl.endsWith(".git")) {
          cleanRepoUrl = cleanRepoUrl.slice(0, -4);
        }

        // Remove any trailing slashes
        cleanRepoUrl = cleanRepoUrl.replace(/\/$/, "");

        // Convert to API URL
        const apiUrl =
          cleanRepoUrl.replace("github.com", "api.github.com/repos") +
          "/contents";

        console.log("Fetching repository structure from:", apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(
            `Failed to load repository structure: ${response.status} ${response.statusText}`
          );
        }

        const contents = await response.json();

        // Process the repository structure
        const processedStructure = processRepositoryContents(contents);
        setStructure(processedStructure);
      } catch (err) {
        console.error("Error loading repository structure:", err);
        setError(err.message);
        setStructure(null);
      } finally {
        setLoading(false);
      }
    };

    loadRepositoryStructure();
  }, [repoUrl]);

  return { structure, loading, error };
}

function processRepositoryContents(contents) {
  const structure = {
    modules: [],
    files: [],
  };

  contents.forEach((item) => {
    if (item.type === "dir") {
      // This is a module/directory
      structure.modules.push({
        name: item.name,
        path: item.path,
        type: "module",
        url: item.html_url,
      });
    } else if (item.type === "file" && item.name.endsWith(".md")) {
      // This is a markdown file
      structure.files.push({
        name: item.name,
        path: item.path,
        type: "file",
        url: item.html_url,
        download_url: item.download_url,
      });
    }
  });

  return structure;
}

export default useRepositoryStructure;
