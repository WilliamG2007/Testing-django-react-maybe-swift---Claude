export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
      />
      <div className="todo-text">
        <div className={`todo-title${todo.completed ? " done" : ""}`}>
          {todo.title}
        </div>
        {todo.description && (
          <div className="todo-description">{todo.description}</div>
        )}
      </div>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
}
