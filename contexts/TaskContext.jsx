import { createContext, useState, useContext } from "react";

export const TaskContext = createContext({
  tasks: [],
  addTask: (task) => { },
  finishTask: (task) => { },
  removeTask: (task) => { },
  clearTasks: () => { },
});

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: new Date().toISOString(),
      description: "task",
      done: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    },
  ]);

  // Aceita string ou objeto { description }
  const addTask = (task) => {
    const description = typeof task === "string" ? task : task.description;
    if (!description || description.trim() === "") return;
    const newTask = {
      id: new Date().toISOString(),
      description,
      done: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const removeTask = (task) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
  };

  const finishTask = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id
          ? t.done
            ? { ...t, done: false, completedAt: null }
            : { ...t, done: true, completedAt: new Date().toISOString() }
          : t
      )
    );
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, finishTask, clearTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
}