import React, { useState } from "react";
import { FaTrash, FaEdit, FaCheckCircle, FaSave, FaTimes } from "react-icons/fa";
import "./TaskItem.css";

const TaskItem = ({ task, toggleComplete, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleSave = () => {
    if (newText.trim() !== "") {
      editTask(task.id, newText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewText(task.text);
    setIsEditing(false);
  };

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="task-edit-input"
          />
        ) : (
          <span>{task.text}</span>
        )}
        <div className="task-meta">⏰ {task.time}</div>
      </div>

      <div className="task-actions">
        {/* ✅ Toggle Complete */}
        <button onClick={() => toggleComplete(task.id)} title="Complete / Reopen">
          <FaCheckCircle color={task.completed ? "#FFD700" : "#aaa"} />
        </button>

        {/* ✏️ Edit Mode */}
        {isEditing ? (
          <>
            <button onClick={handleSave} title="Save">
              <FaSave color="#00c8ff" />
            </button>
            <button onClick={handleCancel} title="Cancel">
              <FaTimes color="#ff4d4d" />
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} title="Edit">
            <FaEdit color="#FFD700" />
          </button>
        )}

        {/* 🗑️ Delete */}
        <button onClick={() => deleteTask(task.id)} title="Delete">
          <FaTrash color="#FFD700" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
