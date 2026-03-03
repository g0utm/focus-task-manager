import { useState, useEffect, useRef } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("All");
  const [warning, setWarning] = useState("");
  const warningTimeout = useRef(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    return () => {
      if (warningTimeout.current) {
        clearTimeout(warningTimeout.current);
      }
    };
  }, []);

  const handleAddTask = (newTask) => {
    if (newTask.priority === "High") {
      const activeHighCount = tasks.filter(
        (task) => task.priority === "High" && !task.completed
      ).length;

      if (activeHighCount >= 3) {
        setWarning("Please finish a high-priority task before adding a new one!");

        if (warningTimeout.current) {
          clearTimeout(warningTimeout.current);
        }

        warningTimeout.current = setTimeout(() => {
          setWarning("");
        }, 3000);

        return;
      }
    }

    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...newTask,
        completed: false,
      },
    ]);
  };

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  const handleEdit = (id, newTitle) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title: newTitle }
          : task
      )
    );
  };

  const handleClearCompleted = () => {
    setTasks((prev) =>
      prev.filter((task) => !task.completed)
    );
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "Active") return !task.completed;
      if (filter === "Completed") return task.completed;
      return true;
    })
    .sort((a, b) => {
      
      // sort completed tasks
      if (a.completed !== b.completed) {                                    
      return a.completed ? 1 : -1;
      }
      
      //sort priority
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  return (
    <div className="app-container">
      <h1>Focus Task Manager</h1>

      {warning && (
        <div className="warning">
          {warning}
        </div>
      )}

      <TaskForm onAddTask={handleAddTask} />

      <FilterBar
        filter={filter}
        setFilter={setFilter}
      />

      <button
        onClick={handleClearCompleted}
        className="btn-secondary"
        style={{ marginBottom: "15px" }}
      >
        Clear Completed
      </button>

      <p className="active-counter">
        {tasks.filter(task => !task.completed).length} Active Tasks
      </p>

      {filteredTasks.length === 0 && (
        <p className="active-counter">
          No tasks found.
        </p>
      )}


      {/* Progress Bar */}
      {tasks.length > 0 && (
        <div className="progress-container">
          <div className="progress-info">
            <span>
              {tasks.filter(task => task.completed).length} / {tasks.length} Completed
            </span>
            <span>
              {Math.round(
                (tasks.filter(task => task.completed).length / tasks.length) * 100
              )}%
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${
                  (tasks.filter(task => task.completed).length / tasks.length) * 100
                }%`
              }}
            ></div>
          </div>
        </div>
      )}

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