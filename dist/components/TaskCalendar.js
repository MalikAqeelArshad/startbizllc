import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
const localizer = momentLocalizer(moment);
const TaskCalendar = (data) => {
    const [events, setEvents] = useState(data || []);
    useEffect(() => {
        const fetchTasks = async () => {
            const calender = events.map((task) => ({
                title: task.name,
                start: new Date(task.date),
                end: new Date(task.date),
                allDay: true,
            }));
            setEvents(calender);
        };
        fetchTasks();
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("h3", null, "Task Calendar"),
        React.createElement(Calendar, { localizer: localizer, events: events, startAccessor: "start", endAccessor: "end", style: { height: 500 } })));
};
export default TaskCalendar;
