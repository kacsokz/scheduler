import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "../reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, 
    {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    }
  );

  const setDay = day => dispatch({ type: SET_DAY, day });

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview }))
      .catch(() => "ERROR_SAVE");
  };

   const cancelInterview = (id, interview) => {
    return axios.delete(`/api/appointments/${id}`, {interview})
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview }))
      .catch(() => "ERROR_DELETE");
  };

  // sets state with data retrieved from db server
  useEffect(() => {
    // WebSockets
    const ws = new WebSocket("ws://localhost:8001");
    ws.onopen = () => ws.send("ping");
    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.type === SET_INTERVIEW) {
        dispatch({ type: message.type, id: message.id, interview: message.interview });
      };
    };
 
    // Fetching and setting initial state from scheduler-api
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then(all => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    })
    .catch(err => {
      console.log(err.response.status);
      console.log(err.response.headers);
      console.log(err.response.data);
    });

  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};