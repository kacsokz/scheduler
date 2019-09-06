import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      if (history.length <= 1) {
        setMode(initial)
      } else {
        setMode(newMode);
        history[history.length - 1] = newMode;
        setHistory(history);
      }
    } else {
      setMode(newMode);
      history.push(newMode);
      setHistory(history);
    }
  };

  function back() {
    if (history.length > 1) {
      history.pop()
      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back, history };
};