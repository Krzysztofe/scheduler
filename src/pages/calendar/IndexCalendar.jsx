import CalendarPanel from "./calendarPanel/CalendarPanel";
import ContextLoadingProv from "./calendarPanel/ContextLoadingProv";

const IndexCalendar = () => {
  return (
    <ContextLoadingProv>
      <CalendarPanel />
    </ContextLoadingProv>
  );
};

export default IndexCalendar;
