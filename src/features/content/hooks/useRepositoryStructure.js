import { useState, useEffect } from "react";

function useRepositoryStructure(repoUrl) {
  const [structure, setStructure] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simple cache to avoid repeated API calls
  const cacheKey = `repo-structure-${repoUrl}`;

  useEffect(() => {
    if (!repoUrl) {
      setStructure(null);
      return;
    }

    const loadRepositoryStructure = async () => {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const cachedData = JSON.parse(cached);
          setStructure(cachedData);
          setLoading(false);
          return;
        } catch (e) {
          // Invalid cache, continue with API call
        }
      }

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
        console.log("Repository URL:", cleanRepoUrl);

        // Add GitHub token if available
        const headers = {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Arcane-Documentation-App",
        };

        // Add authorization header if token is available
        const githubToken =
          import.meta.env.VITE_GITHUB_TOKEN ||
          window.GITHUB_TOKEN ||
          localStorage.getItem("github_token");
        if (githubToken && githubToken !== "ghp_your_token_here") {
          headers["Authorization"] = `token ${githubToken}`;
        }

        const response = await fetch(apiUrl, { headers });

        if (!response.ok) {
          if (response.status === 403) {
            const errorData = await response.json();
            if (errorData.message && errorData.message.includes("rate limit")) {
              const hasToken = import.meta.env.VITE_GITHUB_TOKEN;
              throw new Error(
                hasToken
                  ? "GitHub API rate limit exceeded even with token. Please wait a few minutes and try again."
                  : "GitHub API rate limit exceeded. Please wait a few minutes and try again, or add a GitHub token to .env file for higher limits."
              );
            }
          }
          throw new Error(
            `Failed to load repository structure: ${response.status} ${response.statusText}`
          );
        }

        const contents = await response.json();

        // Recursively fetch all directory contents
        let allContents;
        try {
          allContents = await fetchAllRepositoryContents(
            contents,
            cleanRepoUrl
          );
        } catch (fetchError) {
          console.warn(
            "Recursive fetching failed, using root level only:",
            fetchError
          );
          // Fallback to root level only if recursive fetching fails
          allContents = contents;
        }

        // Process the repository structure
        const processedStructure = processRepositoryContents(allContents);
        setStructure(processedStructure);

        // Cache the result for 5 minutes
        localStorage.setItem(cacheKey, JSON.stringify(processedStructure));
        setTimeout(() => {
          localStorage.removeItem(cacheKey);
        }, 5 * 60 * 1000); // 5 minutes
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

// Recursively fetch all repository contents
async function fetchAllRepositoryContents(contents, repoUrl) {
  const allContents = [...contents];
  console.log("Processing contents:", contents.length, "items");

  for (const item of contents) {
    if (item.type === "dir") {
      try {
        // Fetch contents of this directory
        const dirApiUrl = `https://api.github.com/repos/${repoUrl
          .split("/")
          .slice(-2)
          .join("/")}/contents/${item.path}`;
        console.log("Fetching directory:", item.path, "from:", dirApiUrl);

        // Add delay to prevent rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Add GitHub token if available
        const headers = {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Arcane-Documentation-App",
        };

        const githubToken =
          import.meta.env.VITE_GITHUB_TOKEN ||
          window.GITHUB_TOKEN ||
          localStorage.getItem("github_token");
        if (githubToken && githubToken !== "ghp_your_token_here") {
          headers["Authorization"] = `token ${githubToken}`;
        }

        const dirResponse = await fetch(dirApiUrl, { headers });

        if (dirResponse.ok) {
          const dirContents = await dirResponse.json();
          // Add the directory contents to our collection
          allContents.push(...dirContents);

          // Recursively fetch subdirectories (only directories, not all contents)
          const subDirs = dirContents.filter(
            (content) => content.type === "dir"
          );
          if (subDirs.length > 0) {
            try {
              const subContents = await fetchAllRepositoryContents(
                subDirs,
                repoUrl
              );
              allContents.push(...subContents);
            } catch (subError) {
              console.warn(
                `Failed to fetch subdirectories for ${item.path}:`,
                subError
              );
              // Continue with other directories even if one fails
            }
          }
        } else if (dirResponse.status === 403) {
          const errorData = await dirResponse.json();
          if (errorData.message && errorData.message.includes("rate limit")) {
            console.warn(
              `Rate limit hit while fetching ${item.path}, skipping...`
            );
            // Skip this directory but continue with others
          } else {
            throw new Error(
              `Failed to fetch directory ${item.path}: ${dirResponse.status}`
            );
          }
        }
      } catch (error) {
        console.warn(
          `Failed to fetch contents of directory ${item.path}:`,
          error
        );
      }
    }
  }

  return allContents;
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