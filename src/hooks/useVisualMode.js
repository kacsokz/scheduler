import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      if (history.length <= 1) {
        setMode(initial)
      } else {
        setMode(mode);
        history[history.length - 1] = mode;
        setHistory(history);
      }
    } else {
      setMode(mode);
      history.push(mode);
      setHistory(history);
    }
  };

  function back() {
    if (history.length > 1) {
      history.pop()
      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
};