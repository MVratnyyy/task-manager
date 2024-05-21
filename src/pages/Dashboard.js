import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ProgressBar, Card } from 'react-bootstrap';
import Project from '../components/Project';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');

  const handleAddProject = () => {
    setProjects([...projects, { name: projectName, tasks: [] }]);
    setProjectName('');
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newProjects = Array.from(projects);
    const [movedProject] = newProjects.splice(result.source.index, 1);
    newProjects.splice(result.destination.index, 0, movedProject);
    setProjects(newProjects);
  };

  const calculateOverallProgress = () => {
    if (projects.length === 0) return 0;
    let totalTasks = 0;
    let completedTasks = 0;
    projects.forEach(project => {
      totalTasks += project.tasks.length;
      completedTasks += project.tasks.filter(task => task.completed).length;
    });
    return (completedTasks / totalTasks) * 100;
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card className="p-3 mb-4">
            <h2>Dashboard</h2>
            <ProgressBar now={calculateOverallProgress()} label={`Overall Progress: ${Math.round(calculateOverallProgress())}%`} className="mb-3" />
            <Form inline className="mb-3">
              <Form.Control
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="mr-2"
              />
              <Button onClick={handleAddProject}>Add Project</Button>
            </Form>
          </Card>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="projects">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Row>
                    {projects.map((project, index) => (
                      <Draggable key={index} draggableId={`project-${index}`} index={index}>
                        {(provided) => (
                          <Col ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sm={12} md={6} lg={4} className="mb-3">
                            <Project project={project} />
                          </Col>
                        )}
                      </Draggable>
                    ))}
                  </Row>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
