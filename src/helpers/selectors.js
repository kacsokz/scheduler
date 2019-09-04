// returns an array of appointments for a given day
export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(item => item.name === day);
  if (state.days.length === 0 || selectedDay === undefined) {
    return []
  }
  const returnedArray = selectedDay.appointments.map(id => state.appointments[id])
  return returnedArray;
};