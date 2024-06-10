import React, { useState, useEffect } from 'react';
import './App.css';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import { Provider } from 'react-redux';
import store from './store'; 


interface Task {
  id: number;
  text: string;
  category: string;
}

const API_BASE_URL = 'http://localhost:5000';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (text: string, category: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, category }),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const removeTask = async (id: number) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const filteredTasks = () => {
    if (filter === 'all') {
      return tasks;
    }
    return tasks.filter(task => task.category === filter);
  };

  return (
    <Provider store={store}> {/* Dostarcz store Redux */}
      <div className="App">
        <h1>Lista rzeczy do zrobienia</h1>
        <TaskInput onAddTask={addTask} />
        <div className="filter-container">
          <label htmlFor="filter">Wyświetl po kategorii: </label>
          <select 
            id="filter"
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Wszystkie</option>
            <option value="daily">Codzienne</option>
            <option value="one-time">Jednorazowe</option>
          </select>
        </div>
        <TaskList tasks={filteredTasks()} onRemoveTask={removeTask} />
      </div>
    </Provider>
  );
}

export default App;
