// TaskInput.tsx
import React, { useState } from 'react';

interface TaskInputProps {
  onAddTask: (text: string, category: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [task, setTask] = useState<string>('');
  const [category, setCategory] = useState<string>('daily');

  const addTask = () => {
    if (task.trim()) {
      onAddTask(task, category);
      setTask('');
    }
  };

  return (
    <div className="input-container">
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Dodaj nowe zadanie" 
      />
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="daily">Codzienne</option>
        <option value="one-time">Jednorazowe</option>
      </select>
      <button onClick={addTask}>Dodaj zadanie</button>
    </div>
  );
}

export default TaskInput;
