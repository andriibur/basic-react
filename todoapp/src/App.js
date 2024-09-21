import React, { useState, useEffect, useReducer, useRef, useMemo, useCallback } from 'react';
import { Button, TextField, List, ListItem, Typography, Card, CardContent, Grid } from '@mui/material';

export default function App() {
  const init = () => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  };

  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const [todos, dispatch] = useReducer(reducer, [], init);

  function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload
    if (input.trim() !== '') {
      addTodo(input);
      setInput('');
    }
  }

  function addTodo(task) {
    const newTodo = { id: Date.now(), task, completed: false };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'ADD_TODO':
        return [...state, action.payload];
      case 'TOGGLE_TODO':
        return state.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        );
      case 'REMOVE_TODO':
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, [dispatch]);

  const incompleteTasks = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  return (
    <Grid display="flex" justifyContent="center" alignItems="center" style={{ padding: 24 }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h4">My To-Do List</Typography>
          <Typography variant="h6">Incomplete Tasks: {incompleteTasks}</Typography>
          <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
            <TextField
              size="small"
              label="Enter a task"
              variant="outlined"
              value={input}
              inputRef={inputRef}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
          <List>
            {todos.map((todo, index) => (
              <ListItem
                key={index}
                onClick={() => toggleTodo(todo.id)}
                style={{
                  textDecoration: todo.completed && 'line-through'
                }}>
                {todo.task}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Grid>
  )
}