import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, toggleComplete, deleteTask }) {
  return (
    <ul className="task-list">
      {tasks.map((item, index) => (
        <TaskItem
          key={index}
          item={item}
          index={index}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
