import React, { useReducer, useState } from 'react';
import TodoList from './TodoList';
import { TextField, Button } from '@mui/material';

const initialState = [
  { id: 1, task: 'Learn React', completed: false },
  { id: 2, task: 'Build a To-Do App', completed: true },
];

// Reducer function for managing the to-do list state
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'TOGGLE_TODO':
      return state.map(todo => 
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

function TodoListContainer() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState(''); // State for form input

  // Function to handle adding a new to-do
  const addTodo = () => {
    if (input.trim() !== '') {
      const newTodo = { id: Date.now(), task: input, completed: false };
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setInput(''); // Clear the input after adding the to-do
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
        style={{ marginBottom: '20px' }}
      >
        <TextField
          label="Enter a task"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </form>

      <TodoList todos={todos} toggleTodo={(id) => dispatch({ type: 'TOGGLE_TODO', payload: id })} />
    </div>
  );
}

export default TodoListContainer;
