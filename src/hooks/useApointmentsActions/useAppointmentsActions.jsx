import { useState } from "react";
import AppointmentsMutations from "../../services/AppointmentsMutations";
import {
  addAppointment,
  appointmentWithISODate,
  changeAppointment,
  deleteAppointment,
  updatedAppointment,
} from "./servicesAppointemtsActions";

appointmentWithISODate;

export const useAppointmentActions = (setAppointments, apointments) => {
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddedApointment, setIsAddedApointment] = useState(true);

  const commitChanges = async ({ added, changed, deleted }) => {
    if (added) {
      setActionLoading(true);
      const { errorMsg } = await AppointmentsMutations(
        "POST",
        "appointments",
        null,
        appointmentWithISODate(added)
      );
      setIsAddedApointment(prev => !prev);
      setActionLoading(false);
      if (errorMsg) {
        setError(errorMsg);
      }
    }

    if (changed) {
      const id = Object.keys(changed)[0];
      setActionLoading(true);

      const { errorMsg } = await AppointmentsMutations(
        "PUT",
        "appointments",
        id,
        updatedAppointment(changed, apointments)
      );
      setActionLoading(false);
      if (errorMsg) {
        setError(errorMsg);
      }
    }

    if (deleted !== undefined) {
      setActionLoading(true);
      const { errorMsg } = await AppointmentsMutations(
        "DELETE",
        "appointments",
        deleted,
        null
      );
      setActionLoading(false);
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
    actionLoading,
    error,
  };
};
