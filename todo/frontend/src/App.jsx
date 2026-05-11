import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/todos');
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title, description) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });
      if (!response.ok) throw new Error('Failed to create todo');
      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Add error:', err);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const todo = todos.find(t => t.id === id);
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          completed: !completed
        })
      });
      if (!response.ok) throw new Error('Failed to update todo');
      setTodos(todos.map(t => t.id === id ? { ...t, completed: !completed } : t));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Toggle error:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      setTodos(todos.filter(t => t.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Delete error:', err);
    }
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="app">
      <div className="container">
        <h1>📝 My Todos</h1>
        
        {error && <div className="error">{error}</div>}
        
        <TodoForm onAdd={addTodo} />
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div className="stats">
              {completedCount} of {todos.length} completed
            </div>
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
            {todos.length === 0 && (
              <div className="empty-state">
                No todos yet. Create one to get started! 🎉
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
