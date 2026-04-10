import { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api/todos";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  const load = () =>
    getTodos()
      .then((r) => setTodos(r.data))
      .catch(() => setError("Could not reach the backend. Is Django running?"));

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (data) => {
    await createTodo(data);
    load();
  };

  const handleToggle = async (todo) => {
    await updateTodo(todo.id, { completed: !todo.completed });
    load();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    load();
  };

  return (
    <main className="container">
      <h1>Todo App</h1>
      <p className="subtitle">Django REST Framework + React</p>
      {error && <p className="error">{error}</p>}
      <TodoForm onSubmit={handleCreate} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </main>
  );
}
