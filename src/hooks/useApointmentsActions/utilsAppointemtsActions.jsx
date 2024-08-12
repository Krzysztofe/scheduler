import { convertToISO } from "../../utils/convertDateToISO";

export const appointmentWithISODate = added => {
  return {
    ...added,
    startDate: convertToISO(added.startDate),
    endDate: convertToISO(added.endDate),
    id: "",
  };
};

export const updatedAppointment = (changed, appointments) => {
  const id = Object.keys(changed)[0];
  const updatedValues = { ...Object.values(changed)[0] };

  if (updatedValues.endDate) {
    updatedValues.endDate = convertToISO(updatedValues.endDate);
  }
  if (updatedValues.startDate) {
    updatedValues.startDate = convertToISO(updatedValues.startDate);
  }

  const existingAppointment = appointments.find(
    appointment => appointment.id === id
  );
  return existingAppointment
    ? { ...existingAppointment, ...updatedValues }
    : null;
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
