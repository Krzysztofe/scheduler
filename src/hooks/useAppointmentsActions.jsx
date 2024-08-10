import { useCallback, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import firebaseConfig from "../utils/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import firestoreOperations from "../services/fetch";

import usePerformFirestoreOperation from "../services/newFetch";

export const useAppointmentActions = setAppointments => {
  const [error, setError] = useState(null);
  const [isAddApointment, setIsAddApointment] = useState(true);

  const commitChanges = useCallback(
    async ({ added, changed, deleted }) => {
      setAppointments(prevData => {
        let updatedData = [...prevData];

        if (added) {
          const startingAddedId =
            updatedData.length > 0
              ? updatedData[updatedData.length - 1].id + 1
              : 0;

          const newAppointment = {
            ...added,
            startDate: added.startDate.toString(),
            endDate: added.endDate.toString(),
          };

          usePerformFirestoreOperation("POST", "appointments", null, {
            id: startingAddedId,
            ...newAppointment,
          });

          setIsAddApointment(prev => !prev);

          updatedData = [
            ...updatedData,
            { id: startingAddedId, ...newAppointment },
          ];
        }

        if (changed) {
          updatedData = updatedData.map(appointment => {
            const changeId = appointment.id;

            console.log("chang", changeId);
            if (changed[changeId]) {
              const updatedAppointment = {
                ...appointment,
                ...changed[changeId],
              };

              usePerformFirestoreOperation(
                "PUT",
                "appointments",
                changeId,
                updatedAppointment
              );

              return updatedAppointment;
            }
            return appointment;
          });
        }

        if (deleted !== undefined) {
          const deletedAppointment = updatedData.find(
            appointment => appointment.id === deleted
          );
          updatedData = updatedData.filter(
            appointment => appointment.id !== deleted
          );

          if (deletedAppointment) {
            usePerformFirestoreOperation(
              "DELETE",
              "appointments",
              deletedAppointment.id,
              null
            );
          }
        }

        return updatedData;
      });
    },
    [setAppointments]
  );

  return {
    commitChanges,
    isAddApointment,
  };
};
