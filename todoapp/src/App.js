import React, { useState, useEffect, useReducer, useRef, useMemo, useCallback, useContext } from 'react';
import { Button, TextField, List, ListItem, Typography, Card, CardContent, Grid, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { ThemeContext } from './ThemeContext.js';

export default function App() {
  const init = () => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  };

  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const [todos, dispatch] = useReducer(reducer, [], init);

  const { theme, toggleTheme } = useContext(ThemeContext);

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

  const handleChange = (event) => toggleTheme(event.target.value);

  const themeStyles = {
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    padding: '20px',
    minHeight: '100vh',
  };

  return (
    <Grid display="flex" justifyContent="center" alignItems="center" style={{ padding: 24, ...themeStyles }}>
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
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={theme}
            label="Theme"
            onChange={handleChange}
          >
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            <FormControlLabel value="light" control={<Radio />} label="Light" />
          </RadioGroup>
        </CardContent>
      </Card>
    </Grid>
  )
}