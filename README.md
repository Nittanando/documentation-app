# Arcane

A modern, dynamic documentation viewer built with React and Tailwind CSS v4 that automatically generates navigation from GitHub repository structures and renders markdown content with rich features.

## 🚀 Features

- **Dynamic Repository Integration**: Automatically loads and displays documentation from any public GitHub repository
- **Smart Navigation**: Generates hierarchical sidebar navigation from repository directory structure
- **Rich Markdown Rendering**: Supports code highlighting, tables, and Mermaid diagrams
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme**: Built-in theme switching with persistent preferences
- **Sticky Sidebar**: Professional documentation layout with sticky navigation
- **Real-time Content Loading**: Fetches content directly from GitHub repositories

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features
- **Tailwind CSS v4** - Utility-first CSS framework with new `@layer` system
- **Vite** - Fast build tool and development server
- **Framer Motion** - Smooth animations and transitions
- **Mermaid.js** - Diagram rendering for flowcharts, sequence diagrams, etc.
- **React Markdown** - Markdown rendering with syntax highlighting
- **GitHub API** - Repository structure and content fetching

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd arcane
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── App.jsx                                    # Main application component
├── index.css                                 # Global styles with Tailwind v4 layers
├── main.jsx                                  # Application entry point
└── features/
    ├── content/
    │   └── hooks/
    │       ├── useExternalContent.js         # External content loading
    │       └── useRepositoryStructure.js     # Repository structure fetching
    ├── sidebar/
    │   ├── components/
    │   │   └── DynamicSidebar.jsx            # Dynamic sidebar component
    │   └── hooks/
    │       └── useDynamicSidebar.js          # Dynamic sidebar logic
    ├── theme/
    │   └── components/
    │       └── ThemeToggle.jsx               # Theme toggle component
    └── viewer/
        └── components/
            ├── MarkdownViewer.jsx            # Markdown rendering
            └── MermaidDiagram.jsx            # Mermaid diagram component
```

## 🎨 Styling Architecture

This project uses **Tailwind CSS v4** with the new `@layer` system:

### CSS Layers Structure

```css
@import "tailwindcss";

@layer base {
  /* Base styles, typography, theme colors */
}

@layer components {
  /* Component-specific styles */
}

@layer utilities {
  /* Utility classes, animations, responsive styles */
}
```

### Theme Colors

#### Light Theme

- **Background**: `#ffffff` (white)
- **Text**: `#374151` (gray-700)
- **Headings**: `#111827` (gray-900)
- **Links**: `#2563eb` (blue-600)

#### Dark Theme

- **Background**: `#111827` (gray-900)
- **Secondary Background**: `#1f2937` (gray-800)
- **Text**: `#d1d5db` (gray-300)
- **Headings**: `#f9fafb` (white)
- **Links**: `#60a5fa` (blue-400)

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Key Components

#### DynamicSidebar

- Generates navigation from repository structure
- Supports collapsible nested items
- Sticky positioning on desktop
- Mobile-responsive overlay

#### MarkdownViewer

- Renders markdown with syntax highlighting
- Supports Mermaid diagrams
- Custom styling for code blocks and tables
- Responsive design

#### MermaidDiagram

- Renders various diagram types (flowchart, sequence, gantt, etc.)
- Theme-aware styling
- Mobile-responsive with horizontal scrolling
- Error handling for unsupported diagrams

### Custom Hooks

#### useExternalContent

```javascript
const { content, loading, error } = useExternalContent(repoUrl, filePath);
```

Fetches markdown content from GitHub repositories.

#### useRepositoryStructure

```javascript
const { structure, loading, error } = useRepositoryStructure(repoUrl);
```

Fetches and processes repository directory structure.

#### useDynamicSidebar

```javascript
const { sidebarItems, loading, error } = useDynamicSidebar(repoUrl);
```

Processes repository structure into sidebar navigation items.

## 🌐 Usage

### Basic Usage

1. **Enter Repository URL**: Input any public GitHub repository URL in the header
2. **Automatic Navigation**: The sidebar automatically generates from the repository structure
3. **View Content**: Click any file in the sidebar to view its content
4. **Theme Toggle**: Switch between light and dark themes

### Supported Repository Structure

The app intelligently organizes content based on common documentation patterns:

- **README.md** → Overview section
- **learning-path.md** → Learning Path section
- **Module directories** → Collapsible sections with icons
- **Markdown files** → Individual documentation pages

### Smart Organization

- **Icons**: Automatic icon assignment based on file/folder names
- **Ordering**: Intelligent ordering of modules and files
- **Filtering**: Excludes system directories (`.git`, `node_modules`, etc.)

## 🎯 Features in Detail

### Repository Integration

- Fetches repository structure via GitHub API
- Loads markdown content from raw GitHub URLs
- Handles repository URL variations (with/without `.git` suffix)
- Error handling for private or non-existent repositories

### Markdown Rendering

- **Syntax Highlighting**: Code blocks with language-specific highlighting
- **Tables**: Responsive table rendering
- **Mermaid Diagrams**: Flowcharts, sequence diagrams, Gantt charts, etc.
- **Links**: External links with proper target attributes
- **Typography**: Custom styling for headings, lists, blockquotes

### Responsive Design

- **Mobile**: Overlay sidebar with backdrop
- **Desktop**: Sticky sidebar with full height
- **Tablet**: Smooth transition between mobile and desktop layouts
- **Diagrams**: Horizontal scrolling for wide diagrams on mobile

### Performance

- **Lazy Loading**: Content loaded on demand
- **Caching**: Repository structure cached during session
- **Optimized Builds**: Vite with Rolldown for fast builds
- **Code Splitting**: Automatic code splitting for optimal loading

## 🐛 Troubleshooting

### Common Issues

1. **Repository Not Loading**

   - Ensure the repository is public
   - Check the repository URL format
   - Verify the repository exists

2. **Mermaid Diagrams Not Rendering**

   - Check diagram syntax
   - Some diagram types may not be supported
   - Check browser console for errors

3. **Styling Issues**
   - Ensure Tailwind CSS v4 is properly configured
   - Check that `@layer` directives are used correctly
   - Verify theme classes are applied

### Development Tips

- Use browser dev tools to inspect theme classes
- Check network tab for API requests
- Monitor console for any JavaScript errors
- Test with different repository structures

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use Tailwind utility classes
- Maintain consistent file structure
- Add proper error handling

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the component library
- [Mermaid](https://mermaid-js.github.io/) for diagram rendering
- [GitHub](https://github.com/) for the API and hosting platform
