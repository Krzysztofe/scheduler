import { createContext, useState } from "react";

export const ContextCalendar = createContext({});

const ContextCalendarProv = props => {
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [errorAction, setErrorAction] = useState(null);

  return (
    <ContextCalendar.Provider
      value={{
        isLoadingAction,
        setIsLoadingAction,
        errorAction,
        setErrorAction,
      }}
    >
      {props.children}
    </ContextCalendar.Provider>
  );
};

export default ContextCalendarProv;
