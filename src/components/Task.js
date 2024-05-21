import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function Task({ task }) {
  const [completed, setCompleted] = useState(task.completed);

  return (
    <div>
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {task.name} (Priority: {task.priority}, Deadline: {task.deadline})
      </span>
      <Button
        variant={completed ? 'success' : 'secondary'}
        size="sm"
        className="ml-2"
        onClick={() => setCompleted(!completed)}
      >
        {completed ? 'Undo' : 'Complete'}
      </Button>
    </div>
  );
}

export default Task;
