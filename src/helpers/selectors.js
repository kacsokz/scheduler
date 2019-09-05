// returns an array of appointment objects for a given day
export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(item => item.name === day);
  if (state.days.length === 0 || selectedDay === undefined) {
    return [];
  }
  const returnedArray = selectedDay.appointments.map(id => state.appointments[id]);
  return returnedArray;
};

// returns an array of interviewer objects for a given day
export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find(item => item.name === day);
  if (state.days.length === 0 || selectedDay === undefined) {
    return [];
  }
  const returnedArray = selectedDay.interviewers.map(id => state.interviewers[id]);
  return returnedArray;
};

// returns an object containing interview data
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewsByStudent = {};
  interviewsByStudent.student = interview.student;
  interviewsByStudent.interviewer = state.interviewers[interview.interviewer];
  return interviewsByStudent;
};