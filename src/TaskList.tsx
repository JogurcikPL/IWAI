// TaskList.tsx
import React from 'react';

interface Task {
  text: string;
  category: string;
  id: number;
}

interface TaskListProps {
  tasks: Task[];
  onRemoveTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onRemoveTask }) => {
  return (
    <div className="tasks-container">
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text} 
            <button onClick={() => onRemoveTask(task.id)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
