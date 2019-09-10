import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day }
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers  }
    case SET_INTERVIEW: {
      let appointments = {};

      // booking an interview
      if (action.interview) {
        const appointment = {
          ...state.appointments[action.id],
          interview: { ...action.interview }
        };
        appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
        if (!state.appointments[action.id].interview) {
          const selectedDay = state.days.find(item => item.name === state.day);
          return { ...state, appointments, day: selectedDay.spots-- };
        }
        
      // cancelling an interview
      } else {
        const appointment = {
          ...state.appointments[action.id],
          interview: null
        };
        appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
        const selectedDay = state.days.find(item => item.name === state.day);
        return { ...state, appointments, day: selectedDay.spots++ };
      }
      break;
    }
    default: {
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
    }
  }
};

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
      // .then(() => dispatch({ type: SET_INTERVIEW, id, interview }))
      .catch(() => "ERROR_SAVE");
  };

   const cancelInterview = (id, interview) => {
    return axios.delete(`/api/appointments/${id}`, {interview})
      // .then(() => dispatch({ type: SET_INTERVIEW, id, interview }))
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