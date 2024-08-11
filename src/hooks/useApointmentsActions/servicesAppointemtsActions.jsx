import { convertToISO } from "../../utils/convertDateToISO";

export const appointmentWithISODate = added => {
  return {
    ...added,
    startDate: convertToISO(added.startDate),
    endDate: convertToISO(added.endDate),
    id: "",
  };
};

export const updatedAppointment = (changed, apointments) => {
  const newTitle = Object.values(changed)[0].title;
  const id = Object.keys(changed)[0];

  const changedAppointment = apointments?.find(
    appointment => appointment.id === id
  );
  return { ...changedAppointment, title: newTitle };
};
