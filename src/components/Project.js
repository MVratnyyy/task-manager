import React, { useState, useEffect } from 'react';
import { Card, Button, Form, ProgressBar, ListGroup } from 'react-bootstrap';
import Task from './Task';

function Project({ project }) {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskPriority, setTaskPriority] = useState('Normal');
  const [taskDeadline, setTaskDeadline] = useState('');

  const handleAddTask = () => {
    setTasks([...tasks, { name: taskName, priority: taskPriority, deadline: taskDeadline, completed: false, subtasks: [] }]);
    setTaskName('');
    setTaskPriority('Normal');
    setTaskDeadline('');
  };

  useEffect(() => {
    const checkDeadlines = () => {
      tasks.forEach(task => {
        if (task.deadline && !task.completed) {
          const deadlineDate = new Date(task.deadline);
          const today = new Date();
          const timeDifference = deadlineDate - today;
          const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
          if (daysDifference <= 2) {
            alert(`Deadline approaching for task: ${task.name}`);
          }
        }
      });
    };

    checkDeadlines();
  }, [tasks]);

  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    return (completedTasks / tasks.length) * 100;
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <ProgressBar now={calculateProgress()} label={`${Math.round(calculateProgress())}%`} className="mb-3" />
        <Form inline className="mb-3">
          <Form.Control
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="mr-2"
          />
          <Form.Control
            as="select"
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
            className="mr-2"
          >
            <option>Normal</option>
            <option>High</option>
            <option>Low</option>
          </Form.Control>
          <Form.Control
            type="date"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
            className="mr-2"
          />
          <Button onClick={handleAddTask}>Add Task</Button>
        </Form>
        <ListGroup>
          {tasks.map((task, index) => (
            <Task key={index} task={task} />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default Project;
