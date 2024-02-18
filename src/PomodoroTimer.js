import React, { useState, useEffect } from 'react';
import "./PomodoroTimer.css"
import PomodoroInfoAccordion from './PomodoroInfoAccordion';
const PomodoroTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState('pomodoro'); // 'pomodoro', 'shortBreak', 'longBreak'
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default Pomodoro duration in seconds

  // User settings
  const [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [pomodorosBeforeLongBreak, setPomodorosBeforeLongBreak] = useState(4);

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Check notification permission on load
    setNotificationsEnabled(Notification.permission === 'granted');
  }, []);

  const enableNotifications = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        alert('Notifications enabled!');
      }
    });
  };

  const handlePomodoroDurationChange = (e) => {
    setPomodoroDuration(e.target.value);
    if (timerType === 'pomodoro') {
      setTimeLeft(e.target.value * 60);
    }
  };

  const handleShortBreakDurationChange = (e) => {
    setShortBreakDuration(e.target.value);
    if (timerType === 'shortBreak') {
      setTimeLeft(e.target.value * 60);
    }
  };

  const handleLongBreakDurationChange = (e) => {
    setLongBreakDuration(e.target.value);
    if (timerType === 'longBreak') {
      setTimeLeft(e.target.value * 60);
    }
  };

  const handlePomodorosBeforeLongBreakChange = (e) => {
    setPomodorosBeforeLongBreak(e.target.value);
  };

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => {
          if (timeLeft > 0) return timeLeft - 1;

          // Time's up, switch states
          if (timerType === 'pomodoro') {
            const newCount = pomodoroCount + 1;
            setPomodoroCount(newCount);

            if (newCount % pomodorosBeforeLongBreak === 0) {
              setTimerType('longBreak');
              setTimeLeft(longBreakDuration * 60);
              sendNotification('Time for a long break!');
            } else {
              setTimerType('shortBreak');
              setTimeLeft(shortBreakDuration * 60);
              sendNotification('Time for a short break!');
            }
          } else {
            setTimerType('pomodoro');
            setTimeLeft(pomodoroDuration * 60);
            sendNotification('Time to work!');
          }

          return 0;
        });
      }, 1000);
    } else if (!isRunning && timeLeft !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timerType, pomodoroDuration, shortBreakDuration, longBreakDuration, pomodorosBeforeLongBreak, pomodoroCount]);

  const sendNotification = (message) => {
    // Ensure permission for notifications
    if (Notification.permission === 'granted') {
      new Notification(message, {
        icon: 'pomodoro-icon.png' 
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(message, {
            icon: 'pomodoro-icon.png' 
          });
        }
      });
    }
  };

  // Toggle the timer on and off
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
<div className="pomodoro-timer">
    
      <div className="timer-display">
        <h1>{`${Math.floor(timeLeft / 60)}:${('0' + (timeLeft % 60)).slice(-2)}`}</h1>
        {notificationsEnabled ? (
        <button onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      ) : (
        <>
          <button disabled>Start</button>
          <button onClick={enableNotifications}>Enable Notifications</button>
        </>
      )}
      </div>
      <div className="settings">
        <label htmlFor="pomodoroDuration">Pomodoro Duration (minutes):</label>
        <input
          type="number"
          id="pomodoroDuration"
          value={pomodoroDuration}
          onChange={handlePomodoroDurationChange}
        />

        <label htmlFor="shortBreakDuration">Short Break Duration (minutes):</label>
        <input
          type="number"
          id="shortBreakDuration"
          value={shortBreakDuration}
          onChange={handleShortBreakDurationChange}
        />

        <label htmlFor="longBreakDuration">Long Break Duration (minutes):</label>
        <input
          type="number"
          id="longBreakDuration"
          value={longBreakDuration}
          onChange={handleLongBreakDurationChange}
        />

        <label htmlFor="pomodorosBeforeLongBreak">Pomodoros Before Long Break:</label>
        <input
          type="number"
          id="pomodorosBeforeLongBreak"
          value={pomodorosBeforeLongBreak}
          onChange={handlePomodorosBeforeLongBreakChange}
        />
      </div>
      <PomodoroInfoAccordion />
    </div>
  );
};

export default PomodoroTimer;
