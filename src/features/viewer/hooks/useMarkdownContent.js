import { useState, useEffect } from 'react';

function useMarkdownContent(path) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!path) {
      setContent('');
      return;
    }

    const loadContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Convert path to actual file path
        const filePath = path.startsWith('/') ? path.slice(1) : path;
        
        // Try to fetch the markdown file
        const response = await fetch(`/${filePath}`);
        
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.status} ${response.statusText}`);
        }
        
        const markdownContent = await response.text();
        setContent(markdownContent);
      } catch (err) {
        console.error('Error loading markdown content:', err);
        setError(err.message);
        setContent('# Content Not Found\n\nThe requested content could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [path]);

  return { content, loading, error };
}

export default useMarkdownContent;
