import React from 'react';
import { Link } from 'react-router-dom';

function TodoList({ todos, toggleTodo }) {
  return (
    <ul>
      {todos.map(todo => (
        <li
          key={todo.id}
          style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none',
            cursor: 'pointer'
          }}
        >
          <Link to={`/task/${todo.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
            {todo.task}
          </Link>
          <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
