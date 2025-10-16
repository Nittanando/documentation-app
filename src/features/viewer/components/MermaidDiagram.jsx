import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

function MermaidDiagram({ chart, className = "" }) {
  const ref = useRef(null);
  const [renderKey, setRenderKey] = useState(0);

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
      // Clear previous content
      ref.current.innerHTML = "";

      // Initialize mermaid with theme based on current mode
      const isDark = document.documentElement.classList.contains("dark");
      const isMobile = window.innerWidth <= 768;

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

      // Clean the chart text
      const cleanChart = chart.trim();

      // Render the diagram
      mermaid
        .render(`mermaid-${Date.now()}`, cleanChart)
        .then(({ svg }) => {
          ref.current.innerHTML = svg;
        })
        .catch((error) => {
          console.error("Mermaid rendering error:", error);
          console.error("Chart content:", cleanChart);
          ref.current.innerHTML = `
          <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p class="text-yellow-600 dark:text-yellow-400 font-medium">Diagram Preview Unavailable</p>
            <p class="text-yellow-600 dark:text-yellow-400 text-sm mt-1">This diagram type may not be supported or has syntax issues.</p>
            <details class="mt-2">
              <summary class="text-yellow-600 dark:text-yellow-400 text-xs cursor-pointer">Show error details</summary>
              <pre class="text-xs text-yellow-600 dark:text-yellow-400 mt-1 bg-yellow-100 dark:bg-yellow-800 p-2 rounded overflow-auto">${error.message}</pre>
            </details>
          </div>
        `;
        });
    }
  }, [chart, renderKey]);

  return (
    <div className={`mermaid-container my-6 ${className}`}>
      <div ref={ref} className="mermaid-wrapper"></div>
    </div>
  );
}

export default MermaidDiagram;
