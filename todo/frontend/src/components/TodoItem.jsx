import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, todo.completed)}
          className="checkbox"
        />
        <span className="checkmark"></span>
      </label>
      <div className="todo-content">
        <div className="todo-title">{todo.title}</div>
        {todo.description && (
          <div className="todo-description">{todo.description}</div>
        )}
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="btn-delete"
        title="Delete todo"
      >
        🗑️
      </button>
    </div>
  );
}

export default TodoItem;
