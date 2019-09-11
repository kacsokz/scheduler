export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {

  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day }
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers  }
    case SET_INTERVIEW: {
      let appointments = {};
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview && { ...action.interview }
      };
      appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      const days = state.days.map(day => {
      if (day.appointments.includes(action.id)) {
        const sumDays = day.appointments.reduce((acc, currVal) => {
          return (appointments[currVal].interview) ? acc + 1 : acc;
        }, 0);
        const remainingDays = day.appointments.length - sumDays;
        return { ...day, spots: remainingDays };
      } else {
        return { ...day };
      }
      });
      return { ...state, appointments, days };
      }
      default: {
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        )
      }
  }
};