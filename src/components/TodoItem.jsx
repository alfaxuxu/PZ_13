import { useState } from 'react';

function TodoItem({ task, onToggle, onDelete, onEdit, isDark }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px',
      borderBottom: isDark ? '1px solid #333' : '1px solid #eee'
    }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
          autoFocus
          style={{ flex: 1, padding: '4px' }}
        />
      ) : (
        <span
          style={{
            flex: 1,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: isDark ? '#fff' : '#333',
          }}
          onDoubleClick={() => !task.completed && setIsEditing(true)}
        >
          {task.text}
        </span>
      )}
      <button onClick={() => onDelete(task.id)} style={{
        background: '#ff4444',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '4px 8px',
        cursor: 'pointer'
      }}>
        Удалить
      </button>
    </li>
  );
}

export default TodoItem;