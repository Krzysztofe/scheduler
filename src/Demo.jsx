import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import { appointments } from "./demoData";


const initialState = {
  data: [],
  loading: false,
  currentDate: "2017-05-23",
  currentViewName: "Dzień",
};


const reducer = (state, action) => {
  switch (action.type) {
    case "setLoading":
      return { ...state, loading: action.payload };
    // case "setData":
    //   return { ...state, data: action.payload.map(mapAppointmentData) };
    case "setCurrentViewName":
      return { ...state, currentViewName: action.payload };
    // case "setCurrentDate":
    //   return { ...state, currentDate: action.payload };
    default:
      return state;
  }
};



export default function Demo() {
  const [data, setData] = React.useState(appointments);
  const [currentDate, setCurrentDate] = React.useState("2018-06-27");
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { loading, currentViewName } = state;


 const setCurrentViewName = React.useCallback(
   nextViewName =>
     dispatch({
       type: "setCurrentViewName",
       payload: nextViewName,
     }),
   [dispatch]
 );


  const commitChanges = React.useCallback(
    ({ added, changed, deleted }) => {
      setData(prevData => {
        let updatedData = [...prevData];

        if (added) {
          const startingAddedId =
            updatedData.length > 0
              ? updatedData[updatedData.length - 1].id + 1
              : 0;
          updatedData = [...updatedData, { id: startingAddedId, ...added }];
        }

        if (changed) {
          updatedData = updatedData.map(appointment =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          );
        }

        if (deleted !== undefined) {
          updatedData = updatedData.filter(
            appointment => appointment.id !== deleted
          );
        }

        return updatedData;
      });
    },
    [setData]
  );

  return (
    <Paper>
      <Scheduler data={data} height={660} locale="pl-PL">
        <ViewState
          currentDate={currentDate}
          currentViewName={currentViewName}
          onCurrentViewNameChange={setCurrentViewName}
          onCurrentDateChange={setCurrentDate}
        />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <DayView startDayHour={9} endDayHour={19} />
        <ConfirmationDialog />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm />
      </Scheduler>
    </Paper>
  );
}
