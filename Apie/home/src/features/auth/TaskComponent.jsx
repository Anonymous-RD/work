// src/features/tasks/TasksComponent.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask } from "./tasksSlice";
import {
  getTasks as apiGetTasks,
  addTask as apiAddTask,
  removeTask as apiRemoveTask,
} from "../../services/api";

const TasksComponent = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await apiGetTasks();
      response.data.forEach((task) => dispatch(addTask(task)));
    };
    fetchTasks();
  }, [dispatch]);

  const handleAddTask = async () => {
    const newTask = {
      id: tasks.length + 1,
      title: `Task ${tasks.length + 1}`,
      description: "New task",
    };
    const response = await apiAddTask(newTask);
    dispatch(addTask(response.data));
  };

  const handleRemoveTask = async (taskId) => {
    await apiRemoveTask(taskId);
    dispatch(removeTask(taskId));
  };

  return (
    <div>
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description}
            <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksComponent;
