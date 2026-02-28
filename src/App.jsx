import { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark));
  }, [isDark]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  const themeStyles = {
    backgroundColor: isDark ? '#333' : '#fff',
    color: isDark ? '#fff' : '#333',
    minHeight: '100vh',
    transition: 'all 0.3s'
  };

  return (
    <div style={themeStyles}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Менеджер задач</h1>
          <ThemeSwitcher isDark={isDark} setIsDark={setIsDark} />
        </div>
        
        <AddTodoForm onAdd={addTodo} />
        <TodoFilters filter={filter} onFilterChange={setFilter} activeCount={activeCount} />

        {filteredTodos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>
            {filter === 'all' ? 'Задач пока нет' : 
             filter === 'active' ? 'Нет активных задач' : 'Нет выполненных задач'}
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                task={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
                isDark={isDark}
              />
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <button onClick={() => setTodos([])} style={{
            marginTop: '20px',
            padding: '8px 16px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}>
            Очистить всё
          </button>
        )}
      </div>
    </div>
  );
}

export default App;