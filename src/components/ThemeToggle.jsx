import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  };

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  return (
    <button onClick={toggleTheme} style={{ marginLeft: 'auto', background: 'transparent', border: 'none' }}>
      {isDark ? <Sun color="var(--accent)" /> : <Moon color="var(--accent)" />}
    </button>
  );
};

export default ThemeToggle;
