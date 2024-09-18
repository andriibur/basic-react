import React, { useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload
    if (input.trim() !== '') {
      setTodos([...todos, input]); // Add new task to the list
      setInput(''); // Clear the input field
      console.log(todos)
    }
  }

  return (
    <div>
      <h1>My todo list</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter a task'
        />
        <button type='submit'>Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        )
        )}
      </ul>
    </div>
  )
}