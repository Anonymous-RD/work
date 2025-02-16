// src/services/api.js
const mockTasks = [
  { id: 1, title: "Task 1", description: "This is task 1" },
  { id: 2, title: "Task 2", description: "This is task 2" },
];

export const login = async (credentials) => {
  return { data: { user: { id: 1, name: "John Doe" }, token: "12345" } };
};

export const getTasks = async () => {
  return { data: mockTasks };
};

export const addTask = async (task) => {
  mockTasks.push(task);
  return { data: task };
};

export const removeTask = async (taskId) => {
  const index = mockTasks.findIndex((task) => task.id === taskId);
  if (index !== -1) mockTasks.splice(index, 1);
  return { data: taskId };
};
