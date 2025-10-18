import { useState, useEffect } from "react";

function useExternalContent(repoUrl, path) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!repoUrl || !path) {
      setContent("");
      return;
    }

    const loadExternalContent = async () => {
      setLoading(true);
      setError(null);

      try {
        // Convert GitHub URL to raw content URL
        let cleanRepoUrl = repoUrl;

        // Remove .git suffix if present
        if (cleanRepoUrl.endsWith(".git")) {
          cleanRepoUrl = cleanRepoUrl.slice(0, -4);
        }

        // Remove any trailing slashes
        cleanRepoUrl = cleanRepoUrl.replace(/\/$/, "");

        // Convert to raw content URL
        const rawUrl =
          cleanRepoUrl
            .replace("github.com", "raw.githubusercontent.com")
            .replace("/tree/master", "")
            .replace("/blob/master", "") + "/master/" + path;

        console.log("Fetching external content from:", rawUrl);

        // Add GitHub token if available for better rate limits
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

        const response = await fetch(rawUrl, { headers });

        if (!response.ok) {
          throw new Error(
            `Failed to load content: ${response.status} ${response.statusText}`
          );
        }

        const markdownContent = await response.text();
        setContent(markdownContent);
      } catch (err) {
        console.error("Error loading external content:", err);
        setError(err.message);
        setContent(
          "# Content Not Found\n\nThe requested content could not be loaded from the external repository."
        );
      } finally {
        setLoading(false);
      }
    };

    loadExternalContent();
  }, [repoUrl, path]);

  return { content, loading, error };
}

export default useExternalContent;