import React from "react";
import DayListItem from "components/DayListItem";

// responsible for rendering a list of DayListItem's
export default function DayList(props) {
  const days = props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name} 
        spots={day.spots}
        selected={day.name === props.day}
        setDay={event => props.setDay(day.name)}
      />
    );
  });
  return days;
};