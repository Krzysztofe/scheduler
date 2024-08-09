import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  MonthView,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import { appointments } from "../demoData";

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

const PUBLIC_KEY = "AIzaSyBnNAISIUKe6xdhq1_rjor2rxoI3UlMY7k";
const CALENDAR_ID = "f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com";

const getData = (setData, setLoading) => {
  const dataUrl = [
    "https://www.googleapis.com/calendar/v3/calendars/",
    CALENDAR_ID,
    "/events?key=",
    PUBLIC_KEY,
  ].join("");
  setLoading(true);

  return fetch(dataUrl)
    .then(response => response.json())
    .then(data => {
      setTimeout(() => {
        setData(data.items);
        setLoading(false);
      }, 600);
    });
};

const ToolbarWithLoading = ({ children, ...restProps }) => (
  <StyledDiv className={classes.toolbarRoot}>
    <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
    <StyledLinearProgress className={classes.progress} />
  </StyledDiv>
);

const usaTime = date =>
  new Date(date).toLocaleString("en-US", { timeZone: "America/Los_Angeles" });

const mapAppointmentData = appointment => ({
  id: appointment.id,
  startDate: usaTime(appointment.start.dateTime),
  endDate: usaTime(appointment.end.dateTime),
  title: appointment.summary,
});

const initialState = {
  data: [],
  loading: false,
  currentDate: "2017-05-23",
  currentViewName: "month",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setData":
      return { ...state, data: action.payload.map(mapAppointmentData) };
    case "setCurrentViewName":
      return { ...state, currentViewName: action.payload };
    case "setCurrentDate":
      return { ...state, currentDate: action.payload };
    default:
      return state;
  }
};

export default function Calendar() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { loading, currentViewName, currentDate } = state;
  const [data, setData] = React.useState(appointments);

  const setCurrentViewName = React.useCallback(
    nextViewName =>
      dispatch({
        type: "setCurrentViewName",
        payload: nextViewName,
      }),
    [dispatch]
  );

  const setCurrentDate = React.useCallback(
    nextDate =>
      dispatch({
        type: "setCurrentDate",
        payload: nextDate,
      }),
    [dispatch]
  );

  const setLoading = React.useCallback(
    nextLoading =>
      dispatch({
        type: "setLoading",
        payload: nextLoading,
      }),
    [dispatch]
  );

  React.useEffect(() => {
    getData(setData, setLoading);
  }, [setData, currentViewName, currentDate]);

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

console.log('',data)

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
        <DayView startDayHour={7.5} endDayHour={17.5} displayName="Dzień" />
        <WeekView startDayHour={7.5} endDayHour={17.5} displayName="Tydzień" />
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
        <AppointmentTooltip
          showOpenButton
          showCloseButton
          messages={{
            detailsLabel: "Szczegóły",
            closeLabel: "Zamknij",
            deleteButtonLabel: "Usuń",
            openButtonLabel: "Otwórz",
            saveButtonLabel: "Zapisz",
          }}
        />

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
