import React from "react";

const QuoteBox = ({ quote }) => {
  if (!quote) return null; // hide empty box

  return (
    <div
      className="quote-box"
      style={{
        transition: "opacity 0.3s ease",
        opacity: 1,
      }}
    >
      {quote}
    </div>
  );
};

export default QuoteBox;
