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

  // Add learning-path.md if it exists
  const learningPathFile = structure.files.find(
    (file) => file.name.toLowerCase() === "learning-path.md"
  );

  if (learningPathFile) {
    items.push({
      title: "Learning Path",
      path: learningPathFile.path,
      type: "file",
      icon: "🗺️",
    });
  }

  // Process modules (directories)
  const modules = structure.modules
    .filter((module) => !isSystemDirectory(module.name))
    .sort((a, b) => getModuleOrder(a.name) - getModuleOrder(b.name));

  modules.forEach((module) => {
    const moduleItem = {
      title: formatModuleTitle(module.name),
      path: module.path,
      type: "module",
      icon: getModuleIcon(module.name),
      children: [],
    };

    // Add files within this module
    const moduleFiles = structure.files
      .filter((file) => file.path.startsWith(module.path + "/"))
      .sort((a, b) => getFileOrder(a.name) - getFileOrder(b.name));

    moduleFiles.forEach((file) => {
      moduleItem.children.push({
        title: formatFileName(file.name),
        path: file.path,
        type: "file",
        icon: getFileIcon(file.name),
      });
    });

    // Only add module if it has children or is important
    if (moduleItem.children.length > 0 || isImportantModule(module.name)) {
      items.push(moduleItem);
    }
  });

  // Add standalone files (not in modules)
  const standaloneFiles = structure.files
    .filter((file) => {
      const isInModule = structure.modules.some((module) =>
        file.path.startsWith(module.path + "/")
      );
      const isSpecialFile = [
        "readme.md",
        "learning-path.md",
        "index.md",
      ].includes(file.name.toLowerCase());
      return !isInModule && !isSpecialFile;
    })
    .sort((a, b) => getFileOrder(a.name) - getFileOrder(b.name));

  standaloneFiles.forEach((file) => {
    items.push({
      title: formatFileName(file.name),
      path: file.path,
      type: "file",
      icon: getFileIcon(file.name),
    });
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
  };
  return icons[name.toLowerCase()] || "📁";
}

function getFileIcon(name) {
  if (name.toLowerCase().includes("readme")) return "📖";
  if (name.toLowerCase().includes("learning")) return "🗺️";
  if (name.toLowerCase().includes("index")) return "📋";
  if (name.toLowerCase().includes("installation")) return "⬇️";
  if (name.toLowerCase().includes("configuration")) return "⚙️";
  if (name.toLowerCase().includes("advanced")) return "⚡";
  if (name.toLowerCase().includes("api")) return "🔌";
  if (name.toLowerCase().includes("example")) return "💡";
  if (name.toLowerCase().includes("exercise")) return "💪";
  return "📄";
}

export default useDynamicSidebar;
