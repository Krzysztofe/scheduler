import { useState } from "react";
import {
  addAppointment,
  changeAppointment,
  deleteAppointment,
} from "../../pages/calendar/utils";
import AppointmentsMutations from "../../services/AppointmentsMutations";
import {
  appointmentWithISODate,
  updatedAppointment,
} from "./servicesAppointemtsActions";

export const useAppointmentActions = (setAppointments, apointments) => {
  const [error, setError] = useState(null);
  const [isAddedApointment, setIsAddedApointment] = useState(true);

  const commitChanges = async ({ added, changed, deleted }) => {
    if (added) {
      const { errorMsg } = await AppointmentsMutations(
        "POST",
        "appointments",
        null,
        appointmentWithISODate(added)
      );

      if (errorMsg) {
        setError(errorMsg);
      }
    }

    if (changed) {
      const id = Object.keys(changed)[0];

      if (updatedAppointment) {
        const { errorMsg } = await AppointmentsMutations(
          "PUT",
          "appointments",
          id,
          updatedAppointment(changed, apointments)
        );

        if (errorMsg) {
          setError(errorMsg);
        }
      }
    }

    if (deleted !== undefined) {
      const { errorMsg } = await AppointmentsMutations(
        "DELETE",
        "appointments",
        deleted,
        null
      );
      if (errorMsg) {
        setError(errorMsg);
      }
    }

    setAppointments(prevData => {
      let newData = [...prevData];

      if (added) {
        newData = addAppointment(added, newData);
        setIsAddedApointment(prev => !prev);
      }

      if (changed) {
        newData = changeAppointment(changed, newData);
      }

      if (deleted !== undefined) {
        newData = deleteAppointment(deleted, newData);
      }

      return newData;
    });
  };

  return {
    commitChanges,
    isAddedApointment,
    error,
  };
};
