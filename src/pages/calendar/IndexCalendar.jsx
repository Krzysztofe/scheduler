import CalendarPanel from "./calendarPanel/CalendarPanel";
import ContextCalendarProv from "./calendarPanel/ContextCalendarProv";

const IndexCalendar = () => {
  return (
    <ContextCalendarProv>
      <CalendarPanel />
    </ContextCalendarProv>
  );
};

export default IndexCalendar;
