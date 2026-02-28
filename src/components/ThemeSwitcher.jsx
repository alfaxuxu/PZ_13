function ThemeSwitcher({ isDark, setIsDark }) {
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button onClick={toggleTheme} style={{
      padding: '8px 16px',
      backgroundColor: isDark ? '#4a4a4a' : '#f0f0f0',
      color: isDark ? '#fff' : '#333',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }}>
       Переключить на {isDark ? 'светлую' : 'тёмную'} тему
    </button>
  );
}

export default ThemeSwitcher;