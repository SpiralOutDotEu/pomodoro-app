// PomodoroInfoAccordion.js
import React from 'react';
import Accordion from './Accordion'; 
import './Accordion.css'; 

const PomodoroInfoAccordion = () => {
  return (
    <div>
      <Accordion title="About Pomodoro">
        <p>The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank" rel="noopener noreferrer">Learn more</a>.</p>
      </Accordion>
      <Accordion title="How to Use">
        <p>Start by setting the duration for your pomodoro sessions, short breaks, and long breaks. Click 'Start' to begin the timer and work until it signals a break. Adjust settings as needed to customize your focus sessions. For PWA installation, open the app in your browser and select "Install" or "Add to Home Screen" from the browser's menu.</p>
      </Accordion>
    </div>
  );
};

export default PomodoroInfoAccordion;
