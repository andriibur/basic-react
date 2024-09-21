import React from 'react';
import { useParams } from 'react-router-dom';
import AuthHOC from './AuthHOC';

function TaskDetails() {
  const { taskId } = useParams();

  return (
    <div>
      <h2>Task Details</h2>
      <p>Details for task ID: {taskId}</p>
    </div>
  );
}

export default AuthHOC(TaskDetails);
