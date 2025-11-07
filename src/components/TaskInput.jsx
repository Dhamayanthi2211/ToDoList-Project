import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import "./TaskInput.css";

const TaskInput = ({ addTask, updateQuote }) => {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [step, setStep] = useState(1); // 1 = entering text, 2 = entering time
  const textInputRef = useRef(null);
  const timeInputRef = useRef(null);

  useEffect(() => {
    if (step === 1) textInputRef.current.focus();
    else if (step === 2) timeInputRef.current.focus();
  }, [step]);

  // Update quote as user types
  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    if (updateQuote) updateQuote(value); // send current text to App to generate quote
  };

  const handleTextEnter = (e) => {
    if (e.key === "Enter") {
      if (!text.trim()) {
        toast.error("Please enter a task first!");
        return;
      }
      setStep(2); // move to time input
      toast.info("⏰ Set the time now");
    }
  };

  const handleTimeEnter = (e) => {
    if (e.key === "Enter") {
      if (!time) {
        toast.error("Please select a time!");
        return;
      }
      addTask(text.trim(), time); // add the task
      setText("");
      setTime("");
      setStep(1); // reset to text input
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && time) {
      addTask(text.trim(), time);
      setText("");
      setTime("");
      setStep(1);
    }
  };

  return (
    <form className="task-input-form" onSubmit={handleSubmit}>
      {step === 1 && (
        <input
          ref={textInputRef}
          type="text"
          placeholder="Enter task..."
          value={text}
          onChange={handleTextChange}  // updated
          onKeyDown={handleTextEnter}
          className="task-text-input"
        />
      )}
      {step === 2 && (
        <input
          ref={timeInputRef}
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          onKeyDown={handleTimeEnter}
          className="task-time-input"
        />
      )}
      <button type="submit" className="task-add-button">
        Add
      </button>
    </form>
  );
};

export default TaskInput;
