import { useState } from "react";
import useAppointmentsMutations from "../../services/useAppointmentsMutations";
import {
  addAppointment,
  appointmentWithISODate,
  changeAppointment,
  deleteAppointment,
  updatedAppointment,
} from "./utilsAppointemtsActions";

export const useAppointmentActions = (setAppointments, apointments) => {
  const [isAddedApointment, setIsAddedApointment] = useState(true);
  const { performMutation } = useAppointmentsMutations();

  const commitChanges = async ({ added, changed, deleted }) => {
    if (added) {
      await performMutation(
        "POST",
        "appointments",
        null,
        appointmentWithISODate(added)
      );
      setIsAddedApointment(prev => !prev);
    }

    if (changed) {
      const id = Object.keys(changed)[0];
      await performMutation(
        "PUT",
        "appointments",
        id,
        updatedAppointment(changed, apointments)
      );
    }

    if (deleted !== undefined) {
      await performMutation("DELETE", "appointments", deleted, null);
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
  };
};
