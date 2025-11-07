import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";
import QuoteBox from "./components/QuoteBox";
import WeeklyReport from "./components/WeeklyReport";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [quote, setQuote] = useState("");

  // Add new task
  const addTask = (taskText, time) => {
    if (!taskText || !time) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      time,
      completed: false,
      reminded: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setQuote(generateQuoteText(taskText));

    toast.success("✅ Task Added!");
  };

  // Toggle completion (mark/unmark)
  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const updated = { ...task, completed: !task.completed };

          // Show notification only when marking as complete
          if (updated.completed) {
            toast.success("🎉 Task Completed!");
            launchFireworks();
          }
          return updated;
        }
        return task;
      })
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.error("🗑️ Task Deleted!");
  };

  // Edit task
  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
    toast.info("✏️ Task Edited!");
  };

  // Reminder system
  useEffect(() => {
    const checkReminder = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours()}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (!task.completed && !task.reminded && task.time === currentTime) {
            toast.info(`⏰ Reminder: "${task.text}"!`);
            return { ...task, reminded: true };
          }
          return task;
        })
      );
    }, 30000);

    return () => clearInterval(checkReminder);
  }, []);

  // Generate motivational quotes
  const generateQuoteText = (taskText) => {
    const text = taskText.toLowerCase();
    if (text.includes("train"))
      return "The more you sweat in training, the less you bleed in battle.";
    else if (text.includes("study"))
      return "Success doesn’t come to you. You have to go to it.";
    else if (text.includes("sleep"))
      return "Rest is not idleness — it’s preparation for greatness.";
    else if (text.includes("code"))
      return "Code. Debug. Repeat. Every bug brings you closer to mastery.";
    else if (text.includes("work"))
      return "Don’t wish for it — work for it.";
    else if (text.includes("gym"))
      return "Push yourself because no one else is going to do it for you.";
    else return "Stay consistent. Every small step counts.";
  };

  // Fireworks animation
  const launchFireworks = () => {
    const container = document.createElement("div");
    container.className = "fireworks-container";
    document.body.appendChild(container);

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "firework-particle";
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 100 + 50;
      particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
      container.appendChild(particle);
    }

    setTimeout(() => document.body.removeChild(container), 1000);
  };

  return (
    <div className="app-container">
      <div className="app-card">
        <div className="app-header">
          <h1 className="app-title">To-Do List 🕓</h1>
          <QuoteBox quote={quote} />
          <div className="task-input-container">
            <TaskInput addTask={addTask} />
          </div>
        </div>

        {/* Scrollable task list */}
        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </div>

        <WeeklyReport tasks={tasks} />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default App;
