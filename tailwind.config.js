/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "inherit",
            h1: {
              color: "inherit",
            },
            h2: {
              color: "inherit",
            },
            h3: {
              color: "inherit",
            },
            h4: {
              color: "inherit",
            },
            h5: {
              color: "inherit",
            },
            h6: {
              color: "inherit",
            },
            p: {
              color: "inherit",
            },
            strong: {
              color: "inherit",
            },
            em: {
              color: "inherit",
            },
            ul: {
              color: "inherit",
            },
            ol: {
              color: "inherit",
            },
            li: {
              color: "inherit",
            },
            blockquote: {
              color: "inherit",
            },
            a: {
              color: "inherit",
            },
          },
        },
        dark: {
          css: {
            color: "#e5e7eb",
            h1: {
              color: "#f9fafb",
            },
            h2: {
              color: "#f9fafb",
            },
            h3: {
              color: "#f9fafb",
            },
            h4: {
              color: "#f9fafb",
            },
            h5: {
              color: "#f9fafb",
            },
            h6: {
              color: "#f9fafb",
            },
            p: {
              color: "#d1d5db",
            },
            strong: {
              color: "#f9fafb",
            },
            em: {
              color: "#d1d5db",
            },
            ul: {
              color: "#d1d5db",
            },
            ol: {
              color: "#d1d5db",
            },
            li: {
              color: "#d1d5db",
            },
            blockquote: {
              color: "#d1d5db",
            },
            a: {
              color: "#60a5fa",
              "&:hover": {
                color: "#93c5fd",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
