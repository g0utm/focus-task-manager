import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleSave = () => {
    if (!editText.trim()) return;
    onEdit(task.id, editText);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const getBadgeClass = () => {
    if (task.priority === "High") return "badge-high";
    if (task.priority === "Medium") return "badge-medium";
    return "badge-low";
  };

  return (
    <div
      className={`task-card 
        ${task.priority === "High" ? "high" : ""} 
        ${task.completed ? "completed" : ""}`
      }
    >
      {/* Left Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="task-name">{task.title}</span>
            <span className={`priority-badge ${getBadgeClass()}`}>
            {task.priority}
            </span>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", gap: "8px" }}>
        {isEditing ? (
          <>
            <button className="btn-primary" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="btn-secondary"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}

        <button
          className="btn-danger"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;