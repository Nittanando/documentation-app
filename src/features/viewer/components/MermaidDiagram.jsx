import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

// Initialize Mermaid once globally
let mermaidInitialized = false;

function initializeMermaid() {
  if (!mermaidInitialized) {
    const isDark = document.documentElement.classList.contains("dark");

    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "inherit",
      themeVariables: {
        primaryColor: isDark ? "#3b82f6" : "#1e40af",
        primaryTextColor: isDark ? "#f9fafb" : "#1f2937",
        primaryBorderColor: isDark ? "#4b5563" : "#d1d5db",
        lineColor: isDark ? "#6b7280" : "#374151",
        secondaryColor: isDark ? "#1f2937" : "#f3f4f6",
        tertiaryColor: isDark ? "#111827" : "#ffffff",
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
      },
      sequence: {
        useMaxWidth: true,
        wrap: true,
      },
      gantt: {
        useMaxWidth: true,
      },
      pie: {
        useMaxWidth: true,
      },
    });

    mermaidInitialized = true;
  }
}

function MermaidDiagram({ chart, className = "" }) {
  const ref = useRef(null);
  const [renderKey, setRenderKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Re-render on window resize
  useEffect(() => {
    const handleResize = () => {
      setRenderKey((prev) => prev + 1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (ref.current && chart) {
      setIsLoading(true);
      setError(null);

      // Clear previous content
      ref.current.innerHTML = "";

      // Initialize Mermaid if not already done
      initializeMermaid();

      // Clean the chart text and validate
      const cleanChart = chart.trim();

      // Basic validation for common issues
      if (!cleanChart) {
        setError("Empty diagram content");
        setIsLoading(false);
        return;
      }

      // Check for common syntax issues
      if (cleanChart.includes("```") && !cleanChart.startsWith("```")) {
        setError(
          "Diagram contains markdown code block syntax. Please remove ``` markers."
        );
        setIsLoading(false);
        return;
      }

      // Generate unique ID for this diagram
      const diagramId = `mermaid-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // Render the diagram
      mermaid
        .render(diagramId, cleanChart)
        .then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg;
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Mermaid rendering error:", error);
          console.error("Chart content:", cleanChart);
          let friendlyError = error.message;
          if (
            error.message.includes("Parse error") &&
            cleanChart.includes("@")
          ) {
            friendlyError =
              `Parse Error: It looks like your diagram may contain an unquoted '@' symbol. In Mermaid syntax, special characters like '@' in node text should be enclosed in double quotes. For example: 'nodeId["text with @ symbol"]'. Please check your diagram syntax.`;
          }
          setError(friendlyError);
          setIsLoading(false);
        });

      // Cleanup function
      return () => {
        if (ref.current) {
          ref.current.innerHTML = "";
        }
      };
    }
  }, [chart, renderKey]);

  return (
    <div className={`mermaid-container my-6 ${className}`}>
      {isLoading && (
        <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">
            Rendering diagram...
          </span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Diagram Error</span>
          </div>
          <p className="mt-2 text-red-600 dark:text-red-400 text-sm">{error}</p>
          <details className="mt-2">
            <summary className="text-red-600 dark:text-red-400 text-xs cursor-pointer hover:text-red-800 dark:hover:text-red-300">
              Show technical details
            </summary>
            <pre className="text-xs text-red-600 dark:text-red-400 mt-1 bg-red-100 dark:bg-red-800 p-2 rounded overflow-auto">
              {error}
            </pre>
          </details>
        </div>
      )}

      <div ref={ref} className="mermaid-wrapper"></div>
    </div>
  );
}

export default MermaidDiagram;
