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
  return changedAppointment ? { ...changedAppointment, title: newTitle } : null;
};

export const addAppointment = (addedAppointment, updatedData) => {
  return [
    ...updatedData,
    { id: "", ...appointmentWithISODate(addedAppointment) },
  ];
};

export const changeAppointment = (changed, updatedData) => {
  return updatedData?.map(appointment => {
    const changeId = appointment.id;

    if (changed[changeId]) {
      const updatedAppointment = {
        ...appointment,
        ...changed[changeId],
      };

      return updatedAppointment;
    }

    return appointment;
  });
};

export const deleteAppointment = (deleted, updatedData) => {
  return updatedData.filter(appointment => appointment.id !== deleted);
};
