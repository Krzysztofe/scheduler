import { createContext, useState } from "react";

export const ContextLoading = createContext({});

const ContextLoadingProv = props => {
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  return (
    <ContextLoading.Provider
      value={{
        isLoadingAction,
        setIsLoadingAction,
      }}
    >
      {props.children}
    </ContextLoading.Provider>
  );
};

export default ContextLoadingProv;
