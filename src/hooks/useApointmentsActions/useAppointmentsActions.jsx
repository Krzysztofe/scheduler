import { useState } from "react";
import useAppointmentsMutations from "../../services/useAppointmentsMutations";
import {
  addAppointment,
  appointmentWithISODate,
  changeAppointment,
  deleteAppointment,
  updatedAppointment,
} from "./servicesAppointemtsActions";

export const useAppointmentActions = (setAppointments, apointments) => {
  const [error, setError] = useState(null);
  const [isAddedApointment, setIsAddedApointment] = useState(true);
  const { performMutation } = useAppointmentsMutations();

  const commitChanges = async ({ added, changed, deleted }) => {
    if (added) {
      const { errorMsg } = await performMutation(
        "POST",
        "appointments",
        null,
        appointmentWithISODate(added)
      );
      setIsAddedApointment(prev => !prev);

      if (errorMsg) {
        setError(errorMsg);
      }
    }

    if (changed) {
      const id = Object.keys(changed)[0];

      const { errorMsg } = await performMutation(
        "PUT",
        "appointments",
        id,
        updatedAppointment(changed, apointments)
      );

      if (errorMsg) {
        setError(errorMsg);
      }
    }

    if (deleted !== undefined) {
      const { errorMsg } = await performMutation(
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
