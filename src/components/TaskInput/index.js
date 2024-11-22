import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import "./index.css";
import TaskList from "../TaskList";

const TaskInput = () => {
  const [todoList, setTodoList] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [dueDateInput, setDueDateInput] = useState("");
  const [statusInput, setStatusInput] = useState("Pending");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (savedTodoList) setTodoList(savedTodoList);
  }, []);

  // Save tasks to localStorage on todoList update
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const getFilteredTasks = () => {
    if (filterStatus === "All") return todoList;
    return todoList.filter((task) => task.status === filterStatus);
  };

  const getSortedTasks = (tasks) => {
    return tasks.sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate)
    );
  };

  const getProcessedTasks = () => {
    const filteredTasks = getFilteredTasks();
    return getSortedTasks(filteredTasks);
  };

  const onAddTask = (event) => {
    event.preventDefault();
    if (!taskInput || !descriptionInput || !dueDateInput) {
      alert("All fields are required!");
      return;
    }

    const newTask = {
      id: v4(),
      title: taskInput,
      description: descriptionInput,
      dueDate: dueDateInput,
      status: statusInput,
      isChecked: false,
    };

    setTodoList((prevList) => [...prevList, newTask]);
    setTaskInput("");
    setDescriptionInput("");
    setDueDateInput("");
    setStatusInput("Pending");
  };

  const deleteTodo = (id) => {
    setTodoList((prevList) => prevList.filter((task) => task.id !== id));
  };

  const editMode = (id, title) => {
    setEditingTaskId(id);
    setEditingTaskTitle(title);
  };

  const saveEditedTask = (id, editedTask) => {
    setTodoList((prevList) =>
      prevList.map((task) => (task.id === id ? { ...task, ...editedTask } : task))
    );
    setEditingTaskId(null);
  };

  const processedTasks = getProcessedTasks();

  return (
    <div className="app-container">
      <div className="card-container">
        <div className="task-container">
          <h1 className="My-heading">Task Tracker</h1>
          <div className="add-task-container">
            <form className="form" onSubmit={onAddTask}>
              <label htmlFor="task" className="label">
                <span className="create-heading">Create</span> Task
              </label>
              <input
                type="text"
                placeholder="Enter Task"
                id="task"
                className="input"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />
              <textarea
                placeholder="Enter Task Description"
                className="input"
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
              />
              <input
                type="date"
                className="date-input"
                value={dueDateInput}
                onChange={(e) => setDueDateInput(e.target.value)}
              />
              <select
                className="status-input"
                value={statusInput}
                onChange={(e) => setStatusInput(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button type="submit" className="button-btn">
                Add Task
              </button>
            </form>
            <img
              src="https://th.bing.com/th/id/OIP.ZXdr-EvzI83oxt1ccO6oNAHaFY?rs=1&pid=ImgDetMain"
              alt="todoimage"
              className="img"
            />
          </div>
          <hr className="line" />
          <h1 className="my-task-heading">
            <span className="my-heading">My</span> Tasks
          </h1>
          <div className="filters-container">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="input"
            >
              <option value="asc">Sort by Due Date (Asc)</option>
              <option value="desc">Sort by Due Date (Desc)</option>
            </select>
          </div>
          <ul className="todo-list">
            {processedTasks.map((todoDetails) => (
              <TaskList
                key={todoDetails.id}
                todoDetails={todoDetails}
                deleteTodo={deleteTodo}
                editMode={editMode}
                saveEditedTask={saveEditedTask}
                editingTaskId={editingTaskId}
                editingTaskTitle={editingTaskTitle}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
