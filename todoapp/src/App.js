import React from 'react';
import { CardContent, Grid, Card } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home.js'
import TodoListContainer from './components/TodoListContainer.js'
import TaskDetails from './components/TaskDetails.js'

export default function App() {

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/todos">To-Do List</Link>
      </nav>
      <Grid display="flex" justifyContent="center" alignItems="center" style={{ padding: 24 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Routes>
              <Route exact path="/" element={< Home />} />
              <Route path="/todos" element={< TodoListContainer />} />
              <Route path="/task/:taskId" element={< TaskDetails />} />
            </Routes>
          </CardContent>
        </Card>
      </Grid>
    </Router>
  )
}