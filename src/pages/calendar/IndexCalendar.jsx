import Calendar from "./Calendar";
import ContextLoadingProv from "./ContextLoadingProv";

const IndexCalendar = () => {
  return (
    <ContextLoadingProv>
      <Calendar />
    </ContextLoadingProv>
  );
};

export default IndexCalendar;
