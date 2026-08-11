
import React, { createContext, useState } from 'react';

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Learn React Native basics',
      completed: true,
      important: true,
    },
    {
      id: '2',
      title: 'Build a To-Do app with Expo',
      completed: false,
      important: true,
    },
    {
      id: '3',
      title: 'Master FlatList and StyleSheet',
      completed: false,
      important: false,
    },
  ]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

