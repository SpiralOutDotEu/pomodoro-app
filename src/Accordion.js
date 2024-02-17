import React, { useState, useRef } from 'react';
import './Accordion.css';

const Accordion = ({ title, children }) => {
  const [isActive, setIsActive] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="accordion-item">
      <button
        className="accordion-title"
        onClick={() => setIsActive(!isActive)}
      >
        <h2>{title}</h2>
        <span>{isActive ? '−' : '+'}</span>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: isActive ? contentRef.current.scrollHeight + "px" : "0" }}
        className="accordion-content"
      >
        <div className="accordion-text">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
