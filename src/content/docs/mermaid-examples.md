# Mermaid Diagrams

This page demonstrates various Mermaid diagrams that can be used in documentation.

## Flowchart

Here's a simple flowchart showing a basic process:

```mermaid
flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> E[Fix the issue]
    E --> B
    C --> F[End]
```

## Sequence Diagram

A sequence diagram showing user interaction:

```mermaid
sequenceDiagram
    participant U as User
    participant A as App
    participant D as Database

    U->>A: Login Request
    A->>D: Validate Credentials
    D-->>A: User Data
    A-->>U: Login Success

    U->>A: View Documentation
    A->>D: Fetch Content
    D-->>A: Markdown Content
    A-->>U: Rendered Page
```

## Class Diagram

A class diagram showing the application structure:

```mermaid
classDiagram
    class App {
        +activePath: string
        +sidebarOpen: boolean
        +handleItemClick()
        +toggleSidebar()
    }

    class Sidebar {
        +onItemClick: function
        +activePath: string
        +isOpen: boolean
        +render()
    }

    class MarkdownViewer {
        +content: string
        +render()
    }

    class ThemeToggle {
        +isDark: boolean
        +toggleTheme()
    }

    App --> Sidebar
    App --> MarkdownViewer
    App --> ThemeToggle
    MarkdownViewer --> MermaidDiagram
```

## Git Graph

A git graph showing project history:

```mermaid
flowchart TD
    A["Initial commit"] --> B["Add sidebar"]
    B --> C["Add markdown viewer"]
    B --> D["Add theme toggle"]
    C --> E["Merge features"]
    D --> E
    E --> F["Add mermaid support"]
```

## State Diagram

A state diagram showing the application states:

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> ContentLoaded
    Loading --> Error
    ContentLoaded --> Loading : Navigate to new page
    Error --> Loading : Retry
    ContentLoaded --> [*]
    Error --> [*]
```

## Pie Chart

A pie chart showing technology usage:

```mermaid
pie title Technology Stack
    "React" : 40
    "Tailwind CSS" : 25
    "Mermaid" : 15
    "Vite" : 10
    "Other" : 10
```

## Gantt Chart

A Gantt chart showing project timeline:

```mermaid
gantt
    title Documentation App Development
    dateFormat  YYYY-MM-DD
    section Setup
    Project Setup           :done, setup, 2024-01-01, 1d
    Dependencies           :done, deps, after setup, 1d
    section Core Features
    Sidebar Component      :done, sidebar, after deps, 2d
    Markdown Viewer        :done, viewer, after sidebar, 2d
    Theme Toggle           :done, theme, after viewer, 1d
    section Advanced
    Mermaid Support        :active, mermaid, after theme, 2d
    AI Integration         :future, ai, after mermaid, 5d
```

## Journey Diagram

A user journey diagram:

```mermaid
journey
    title User Journey in Documentation App
    section Discovery
      Visit homepage: 5: User
      Browse sidebar: 4: User
    section Learning
      Read introduction: 5: User
      Follow guides: 4: User
      View examples: 5: User
    section Advanced
      Check API docs: 3: User
      View diagrams: 5: User
      Toggle theme: 4: User
```

## Mindmap

A mindmap showing the documentation structure:

```mermaid
mindmap
  root((Documentation))
    Getting Started
      Installation
      Configuration
      Quick Start
    Guides
      Basic Usage
      Advanced Features
      Best Practices
    API Reference
      Core Functions
      Utilities
      Examples
    Diagrams
      Flowcharts
      Sequence Diagrams
      Class Diagrams
```

## Timeline

A timeline showing project milestones:

```mermaid
timeline
    title Project Timeline

    section Phase 1
        Project Setup    : Initial setup
                        : Dependencies
                        : Basic structure

    section Phase 2
        Core Features    : Sidebar
                        : Markdown viewer
                        : Theme toggle

    section Phase 3
        Advanced Features : Mermaid support
                         : AI integration
                         : Performance optimization
```

## Usage

To add Mermaid diagrams to your markdown content, simply wrap your Mermaid code in a code block with the `mermaid` language identifier:

````markdown
```mermaid
flowchart TD
    A[Start] --> B[End]
```
````

The diagrams will automatically render with the appropriate theme (light/dark) based on the current theme setting.

## Supported Diagram Types

- **Flowcharts**: Process flows and decision trees
- **Sequence Diagrams**: Interaction between components
- **Class Diagrams**: Object-oriented design
- **State Diagrams**: System states and transitions
- **Entity Relationship Diagrams**: Database design
- **User Journey**: User experience flows
- **Gantt Charts**: Project timelines
- **Pie Charts**: Data visualization
- **Git Graphs**: Version control history
- **Mindmaps**: Hierarchical information
- **Timelines**: Chronological events

## Tips

1. **Keep diagrams simple**: Complex diagrams can be hard to read
2. **Use meaningful labels**: Clear, descriptive text improves understanding
3. **Test in both themes**: Ensure diagrams look good in light and dark modes
4. **Update regularly**: Keep diagrams in sync with your actual implementation
