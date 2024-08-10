export const addAppointment = (added, updatedData) => {
  const startingAddedId =
    updatedData.length > 0 ? updatedData[updatedData.length - 1].id + 1 : 0;

  const newAppointment = {
    ...added,
    startDate: added.startDate.toString(),
    endDate: added.endDate.toString(),
  };

  return [...updatedData, { id: startingAddedId, ...newAppointment }];
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
  updatedData = updatedData.filter(appointment => appointment.id !== deleted);

  return updatedData;
};