import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  text: string;
  category: string;
}

const initialState: Task[] = [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      return state.filter(task => task.id !== action.payload);
    },
  },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
