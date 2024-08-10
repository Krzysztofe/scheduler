import { useState } from "react";
import {
  addAppointment,
  changeAppointment,
  deleteAppointment,
} from "../pages/calendar/utils";

import AppointmentsMutations from "../services/AppointmentsMutations";

export const useAppointmentActions = setAppointments => {
  const [error, setError] = useState(null);
  const [isAddedApointment, setIsAddedApointment] = useState(true);

  const commitChanges = async ({ added, changed, deleted }) => {
    let updatedData = await new Promise(resolve => {
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

        resolve(newData);
        return newData;
      });
    });

    if (added) {
      const newApointment = updatedData[updatedData.length - 1];
      const id = newApointment.id;

      const { errorMsg } = await AppointmentsMutations(
        "POST",
        "appointments",
        null,
        {
          id,
          ...newApointment,
        }
      );

      if (errorMsg) {
        setError(errorMsg);
      }
    }

    if (changed) {
      for (const id in changed) {
        if (changed.hasOwnProperty(id)) {
          const updatedAppointment = updatedData.find(
            appointment => appointment.id === id
          );

          if (updatedAppointment) {
            const { errorMsg } = await AppointmentsMutations(
              "PUT",
              "appointments",
              id,
              updatedAppointment
            );

            if (errorMsg) {
              setError(errorMsg);
            }
          }
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
  };

  return {
    commitChanges,
    isAddedApointment,
    error,
  };
};
