import {
  EditingState,
  IntegratedEditing,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  DateNavigator,
  DayView,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useCallback, useEffect, useReducer, useState } from "react";
import ErrorPage from "../../components/ErrorPage";
import { useAppointmentActions } from "../../hooks/useApointmentsActions/useAppointmentsActions";
import { useAppointmentsQuery } from "../../services/UseAppointmentsQuery";
import "./Calendar.css";
import { initialState } from "./dataInitialState";
import LoadingPage from "../../components/LoadingPage";
// import LoadingCalendar from "./LoadingCalendar";

const PREFIX = "Demo";

const classes = {
  toolbarRoot: `${PREFIX}-toolbarRoot`,
  progress: `${PREFIX}-progress`,
};

const StyledDiv = styled("div")({
  [`&.${classes.toolbarRoot}`]: {
    position: "relative",
  },
});

const StyledLinearProgress = styled(LinearProgress)(() => ({
  [`&.${classes.progress}`]: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
  },
}));

const ToolbarWithLoading = ({ children, ...restProps }) => (
  <StyledDiv className={classes.toolbarRoot}>
    <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
    <StyledLinearProgress className={classes.progress} />
  </StyledDiv>
);

const reducer = (state, action) => {
  switch (action.type) {
    case "setCurrentViewName":
      return { ...state, currentViewName: action.payload };
    case "setCurrentDate":
      return { ...state, currentDate: action.payload };
    default:
      return state;
  }
};

export default function Calendar() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentViewName, currentDate } = state;
  const [appointments, setAppointments] = useState([]);
  const {
    fetchAppointments,
    loading,
    error: errorQuery,
  } = useAppointmentsQuery(setAppointments);

  const {
    commitChanges,
    isAddedApointment,
    error: errorActions,
    actionLoading,
  } = useAppointmentActions(setAppointments, appointments);

  useEffect(() => {
    fetchAppointments(setAppointments);
  }, [isAddedApointment, currentViewName, currentDate]);

  const setCurrentViewName = useCallback(
    nextViewName =>
      dispatch({
        type: "setCurrentViewName",
        payload: nextViewName,
      }),
    [dispatch]
  );

  const setCurrentDate = useCallback(
    nextDate =>
      dispatch({
        type: "setCurrentDate",
        payload: nextDate,
      }),
    [dispatch]
  );

  if (errorQuery) {
    return <ErrorPage errorMsg={errorQuery} />;
  } else if (errorActions) {
    return <ErrorPage errorMsg={errorActions} />;
  } else {
    return (
      <Paper>
        {actionLoading && <LoadingPage />}
        <Scheduler data={appointments} height={660} locale="pl-PL">
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={setCurrentViewName}
            onCurrentDateChange={setCurrentDate}
          />
          <EditingState onCommitChanges={commitChanges} />
          <IntegratedEditing />
          <DayView startDayHour={7.5} endDayHour={17.5} displayName="Dzień" />
          <WeekView
            startDayHour={7.5}
            endDayHour={17.5}
            displayName="Tydzień"
          />
          <MonthView name="month" displayName="Miesiąc" />
          <ConfirmationDialog
            messages={{
              confirmDeleteMessage: "Czy na pewno chcesz usunąć to wydarzenie?",
              confirmCancelMessage: "Zmknąć okno?",
              cancelButton: "Anuluj",
              deleteButton: "Usuń",
              discardButton: "Zamknij",
            }}
          />
          <Appointments />
          <Toolbar
            {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
          />
          <DateNavigator />
          <TodayButton messages={{ today: "Dzisiaj" }} />
          <ViewSwitcher />
          <AppointmentTooltip showOpenButton showCloseButton />

          <AppointmentForm
            booleanEditorComponent={() => null}
            messages={{
              detailsLabel: "Szczegóły",
              titleLabel: "Tytuł",
              startDateLabel: "Data rozpoczęcia",
              endDateLabel: "Data zakończenia",
              commitCommand: "Zapisz",
            }}
          />
        </Scheduler>
      </Paper>
    );
  }
}
