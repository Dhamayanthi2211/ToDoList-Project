import React from "react";
import "./WeeklyReport.css";

const WeeklyReport = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="weekly-report">
      <h2>Weekly Progress Report 📊</h2>
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="report-stats">
        <p>Total Tasks: {total}</p>
        <p>Completed: {completed}</p>
        <p>Remaining: {total - completed}</p>
      </div>
      <div className="motivation">
        <p>
          {progress === 100
            ? "🔥 You're crushing it! All tasks complete!"
            : progress >= 50
            ? "💪 Keep going! You're more than halfway there!"
            : "🚀 Start strong — every cue counts!"}
        </p>
      </div>
    </div>
  );
};

export default WeeklyReport;