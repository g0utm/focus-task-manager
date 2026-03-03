import { useState, useEffect } from "react";

// detect high priority
function getSuggestedPriority(title) {
  const text = title.toLowerCase();

  const highKeywords = [
    "urgent",
    "asap",
    "immediately",
    "deadline",
    "important",
    "now"
  ];

  if (highKeywords.some(word => text.includes(word))) {
    return "High";
  }

  return null;
}

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [open, setOpen] = useState(false);

  // NEW: lock auto detection after user override
  const [autoDetected, setAutoDetected] = useState(false);
  const [autoLocked, setAutoLocked] = useState(false);

  useEffect(() => {
    const trimmed = title.trim();

    // If title cleared → reset everything
    if (!trimmed) {
      setAutoDetected(false);
      setAutoLocked(false);
      return;
    }

    // If user manually changed priority → no auto detect
    if (autoLocked) {
      setAutoDetected(false);
      return;
    }

    const suggestion = getSuggestedPriority(trimmed);

    if (suggestion === "High") {
      setPriority("High");
      setAutoDetected(true);
    } else {
      setAutoDetected(false);
    }
  }, [title, autoLocked]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({ title, priority });

    // Reset everything after add
    setTitle("");
    setPriority("Low");
    setAutoDetected(false);
    setAutoLocked(false);
    setOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="task-input"
        />

        <div className="custom-select">
          <div
            className="select-trigger"
            onClick={() => setOpen(!open)}
          >
            {priority}
            <span className="arrow">▾</span>
          </div>

          {open && (
            <div className="select-options">
              {["Low", "Medium", "High"].map((level) => (
                <div
                  key={level}
                  className={`select-option ${
                    priority === level ? "selected" : ""
                  }`}
                  onClick={() => {
                    setPriority(level);

                    // user override → lock auto detection
                    setAutoLocked(true);
                    setAutoDetected(false);

                    setOpen(false);
                  }}
                >
                  {level}
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="task-button">
          Add Task
        </button>
      </form>

      <div className={`auto-indicator ${autoDetected ? "visible" : ""}`}>
        {autoDetected ? "⚡ Marked as High Priority" : ""}
      </div>
    </>
  );
}

export default TaskForm;