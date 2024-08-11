// import {
//   EditingState,
//   IntegratedEditing,
//   ViewState,
// } from "@devexpress/dx-react-scheduler";
// import {
//   AppointmentForm,
//   Appointments,
//   AppointmentTooltip,
//   ConfirmationDialog,
//   DateNavigator,
//   DayView,
//   MonthView,
//   Scheduler,
//   TodayButton,
//   Toolbar,
//   ViewSwitcher,
//   WeekView,
// } from "@devexpress/dx-react-scheduler-material-ui";
// import LinearProgress from "@mui/material/LinearProgress";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import { collection, getDocs } from "firebase/firestore";
// import { useCallback, useEffect, useReducer, useState } from "react";
// import { firestore } from "../data/fireaseConfig";

// import { useAppointmentActions } from "../hooks/useAppointmentsActions";

// const PREFIX = "Demo";

// const classes = {
//   toolbarRoot: `${PREFIX}-toolbarRoot`,
//   progress: `${PREFIX}-progress`,
// };

// const StyledDiv = styled("div")({
//   [`&.${classes.toolbarRoot}`]: {
//     position: "relative",
//   },
// });

// const StyledLinearProgress = styled(LinearProgress)(() => ({
//   [`&.${classes.progress}`]: {
//     position: "absolute",
//     width: "100%",
//     bottom: 0,
//     left: 0,
//   },
// }));

// const ToolbarWithLoading = ({ children, ...restProps }) => (
//   <StyledDiv className={classes.toolbarRoot}>
//     <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
//     <StyledLinearProgress className={classes.progress} />
//   </StyledDiv>
// );

// const polishTime = date =>
//   new Date(date).toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });

// const mapAppointmentData = appointment => ({
//   id: appointment.id,
//   startDate: polishTime(appointment.start.dateTime),
//   endDate: polishTime(appointment.end.dateTime),
//   title: appointment.summary,
// });

// const initialState = {
//   data: [],
//   loading: false,
//   currentDate: "2024-08-01",
//   currentViewName: "month",
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "setLoading":
//       return { ...state, loading: action.payload };
//     case "setData":
//       return { ...state, data: action.payload.map(mapAppointmentData) };
//     case "setCurrentViewName":
//       return { ...state, currentViewName: action.payload };
//     case "setCurrentDate":
//       return { ...state, currentDate: action.payload };
//     default:
//       return state;
//   }
// };

// export default function Calendar() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { loading, currentViewName, currentDate } = state;
//   const [appointments, setAppointments] = useState([]);
//   const appointmentsReference = collection(firestore, "appointments");
//   const { commitChanges } = useAppointmentActions(setAppointments);

//   useEffect(() => {
//     const getEvents = async () => {
//       setLoading(true);
//       const data = await getDocs(appointmentsReference);
//       setTimeout(() => {
//         setAppointments(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
//         setLoading(false);
//       }, 600);
//     };
//     getEvents();
//   }, [setAppointments, currentViewName, currentDate]);

//   const setCurrentViewName = useCallback(
//     nextViewName =>
//       dispatch({
//         type: "setCurrentViewName",
//         payload: nextViewName,
//       }),
//     [dispatch]
//   );

//   const setCurrentDate = useCallback(
//     nextDate =>
//       dispatch({
//         type: "setCurrentDate",
//         payload: nextDate,
//       }),
//     [dispatch]
//   );

//   const setLoading = useCallback(
//     nextLoading =>
//       dispatch({
//         type: "setLoading",
//         payload: nextLoading,
//       }),
//     [dispatch]
//   );

//   return (
//     <Paper>
//       <Scheduler data={appointments} height={660} locale="pl-PL">
//         <ViewState
//           currentDate={currentDate}
//           currentViewName={currentViewName}
//           onCurrentViewNameChange={setCurrentViewName}
//           onCurrentDateChange={setCurrentDate}
//         />
//         <EditingState onCommitChanges={commitChanges} />
//         <IntegratedEditing />
//         <DayView startDayHour={7.5} endDayHour={17.5} displayName="Dzień" />
//         <WeekView startDayHour={7.5} endDayHour={17.5} displayName="Tydzień" />
//         <MonthView name="month" displayName="Miesiąc" />
//         <ConfirmationDialog
//           messages={{
//             confirmDeleteMessage: "Czy na pewno chcesz usunąć to wydarzenie?",
//             confirmCancelMessage: "Zmknąć okno?",
//             cancelButton: "Anuluj",
//             deleteButton: "Usuń",
//             discardButton: "Zamknij",
//           }}
//         />
//         <Appointments />
//         <Toolbar
//           {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
//         />
//         <DateNavigator />
//         <TodayButton messages={{ today: "Dzisiaj" }} />
//         <ViewSwitcher />
//         <AppointmentTooltip showOpenButton showCloseButton />

//         <AppointmentForm
//           booleanEditorComponent={() => null}
//           messages={{
//             detailsLabel: "Szczegóły",
//             titleLabel: "Tytuł",
//             startDateLabel: "Data rozpoczęcia",
//             endDateLabel: "Data zakończenia",
//             commitCommand: "Zapisz",
//           }}
//         />
//       </Scheduler>
//     </Paper>
//   );
// }
