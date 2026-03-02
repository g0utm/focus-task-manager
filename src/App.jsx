import { useState, useEffect } from "react";
import "./App.css"
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar"

function App() {
  const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("All");
  const [warning, setWarning] = useState("");

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  const handleAddTask = (newTask) => {
  if (newTask.priority === "High") {
    const activeHighCount = tasks.filter(
      (task) => task.priority === "High" && !task.completed
    ).length;

    if (activeHighCount >= 3) {
      setWarning("Please finish a high-priority task before adding a new one!");
      setTimeout(() => setWarning(""), 3000);
      return;
    }
  }

    setTasks([
    ...tasks,
    {
      id: Date.now(),
      ...newTask,
      completed: false,
    },
  ]);
};

const handleToggle = (id) => {
  setTasks(
    tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  );
};

const handleDelete = (id) => {
  setTasks(tasks.filter((task) => task.id !== id));
};

const filteredTasks = tasks
  .filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  })
  .sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

const handleEdit = (id, newTitle) => {
  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    )
  );
};

const handleClearCompleted = () => {
  setTasks(tasks.filter((task) => !task.completed));
};



  return (
    <div className="app-container">
      <h1>Focus Task Manager</h1>
      {warning && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {warning}
        </div>
      )}
      <TaskForm onAddTask={handleAddTask} />

      <FilterBar
        filter ={filter} setFilter={setFilter} 
      />

      <button onClick={handleClearCompleted} style={{ marginBottom: "15px" }}>
        Clear Completed
      </button>

      <p>
        {tasks.filter(task => !task.completed).length} Active Tasks
      </p>

      <TaskList 
        tasks={filteredTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit} 
      />
    </div>
  );
}

export default App;