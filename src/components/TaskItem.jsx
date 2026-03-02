import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleSave = () => {
    if (!editText.trim()) return;
    onEdit(task.id, editText);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        marginBottom: "10px",
        padding: "8px",
        border: task.priority === "High" ? "2px solid red" : "1px solid #ccc",
        textDecoration: task.completed ? "line-through" : "none",
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        style={{ marginRight: "10px" }}
      />

      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <strong>{task.title}</strong> - {task.priority}
          <button
            onClick={() => setIsEditing(true)}
            style={{ marginLeft: "10px" }}
          >
            Edit
          </button>
        </>
      )}

      <button
        onClick={() => onDelete(task.id)}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;