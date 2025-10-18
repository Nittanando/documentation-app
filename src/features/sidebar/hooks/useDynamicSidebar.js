import { useState, useEffect } from "react";
import useRepositoryStructure from "../../content/hooks/useRepositoryStructure";

function useDynamicSidebar(repoUrl) {
  const [sidebarItems, setSidebarItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    structure,
    loading: repoLoading,
    error: repoError,
  } = useRepositoryStructure(repoUrl);

  useEffect(() => {
    if (!structure) {
      setSidebarItems([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Process repository structure into sidebar items
      const processedItems = processRepositoryToSidebar(structure);
      setSidebarItems(processedItems);
    } catch (err) {
      console.error("Error processing repository structure:", err);
      setError(err.message);
      setSidebarItems([]);
    } finally {
      setLoading(false);
    }
  }, [structure]);

  return {
    sidebarItems,
    loading: loading || repoLoading,
    error: error || repoError,
  };
}

function processRepositoryToSidebar(structure) {
  const items = [];

  // Add README as the first item if it exists
  const readmeFile = structure.files.find(
    (file) => file.name.toLowerCase() === "readme.md"
  );

  if (readmeFile) {
    items.push({
      title: "Overview",
      path: readmeFile.path,
      type: "file",
      icon: "📖",
    });
  }

  // Build hierarchical structure from all directories and files
  const directoryMap = new Map();

  // First, create all directories
  structure.modules
    .filter((module) => !isSystemDirectory(module.name))
    .forEach((module) => {
      directoryMap.set(module.path, {
        title: formatModuleTitle(module.name),
        path: module.path,
        type: "module",
        icon: getModuleIcon(module.name),
        children: [],
        level: module.path.split("/").length - 1,
      });
    });

  // Then, add all markdown files to their respective directories
  structure.files
    .filter((file) => file.name.endsWith(".md")) // Only markdown files
    .sort((a, b) => getFileOrder(a.name) - getFileOrder(b.name))
    .forEach((file) => {
      const fileItem = {
        title: formatFileName(file.name),
        path: file.path,
        type: "file",
        icon: getFileIcon(file.name),
      };

      // Find the appropriate directory for this file
      const pathParts = file.path.split("/");
      if (pathParts.length === 1) {
        // Root level file
        items.push(fileItem);
      } else {
        // File in a directory
        const dirPath = pathParts.slice(0, -1).join("/");
        const directory = directoryMap.get(dirPath);
        if (directory) {
          directory.children.push(fileItem);
        }
      }
    });

  // Add directories to the sidebar, sorted by level and name
  const sortedDirectories = Array.from(directoryMap.values()).sort((a, b) => {
    if (a.level !== b.level) return a.level - b.level;
    return a.title.localeCompare(b.title);
  });

  // Only add directories that have markdown files
  sortedDirectories.forEach((directory) => {
    if (directory.children.length > 0) {
      items.push(directory);
    }
  });

  return items;
}

// Helper functions
function isSystemDirectory(name) {
  const systemDirs = [
    ".github",
    "node_modules",
    ".git",
    "dist",
    "build",
    "coverage",
  ];
  return systemDirs.includes(name.toLowerCase());
}

function isImportantModule(name) {
  const importantModules = [
    "fundamentals",
    "theory",
    "advanced",
    "practical",
    "ops",
    "exercises",
  ];
  return importantModules.includes(name.toLowerCase());
}

function getModuleOrder(name) {
  const order = {
    fundamentals: 1,
    theory: 2,
    practical: 3,
    advanced: 4,
    ops: 5,
    exercises: 6,
    nosql: 7,
  };
  return order[name.toLowerCase()] || 999;
}

function getFileOrder(name) {
  const order = {
    "index.md": 1,
    "introduction.md": 2,
    "getting-started.md": 3,
    "installation.md": 4,
    "configuration.md": 5,
    "advanced.md": 6,
  };
  return order[name.toLowerCase()] || 999;
}

function formatModuleTitle(name) {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatFileName(name) {
  return name
    .replace(".md", "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getModuleIcon(name) {
  const icons = {
    fundamentals: "🔰",
    theory: "📚",
    practical: "🛠️",
    advanced: "⚡",
    ops: "⚙️",
    exercises: "💪",
    nosql: "🗄️",
    docs: "📚",
    examples: "💡",
    assets: "🎨",
    components: "🧩",
    pages: "📄",
    utils: "🔧",
    hooks: "🪝",
    styles: "🎨",
    public: "🌐",
    src: "📦",
  };
  return icons[name.toLowerCase()] || "📁";
}

function getFileIcon(name) {
  if (name.toLowerCase().includes("readme")) return "📖";
  if (name.toLowerCase().includes("learning")) return "🗺️";
  if (name.toLowerCase().includes("index")) return "📋";
  if (name.toLowerCase().includes("introduction")) return "👋";
  if (name.toLowerCase().includes("setup")) return "⚙️";
  if (name.toLowerCase().includes("installation")) return "⬇️";
  if (name.toLowerCase().includes("configuration")) return "⚙️";
  if (name.toLowerCase().includes("advanced")) return "⚡";
  if (name.toLowerCase().includes("core")) return "🎯";
  if (name.toLowerCase().includes("concepts")) return "💡";
  if (name.toLowerCase().includes("features")) return "🚀";
  if (name.toLowerCase().includes("examples")) return "💡";
  if (name.toLowerCase().includes("practices")) return "✨";
  if (name.toLowerCase().includes("migration")) return "🔄";
  if (name.toLowerCase().includes("resources")) return "📚";
  if (name.toLowerCase().includes("api")) return "🔌";
  if (name.toLowerCase().includes("exercise")) return "💪";
  if (name.toLowerCase().includes("guide")) return "📖";
  if (name.toLowerCase().includes("tutorial")) return "🎓";
  return "📄";
}

export default useDynamicSidebar;
