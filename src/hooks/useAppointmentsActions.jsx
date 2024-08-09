import { useCallback } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import firebaseConfig from "./firebaseConfig";

export const useAppointmentActions = setAppointments => {
  const { db } = firebaseConfig();
  const appointmentsReference = collection(db, "appointments");

  const POSTAppointment = async newAppointment => {
    await addDoc(appointmentsReference, newAppointment);
  };

  const PUTAppointment = async (id, newDetails) => {
    const eventsDoc = doc(db, "appointments", id);
    await updateDoc(eventsDoc, newDetails);
  };

  const DELETEAppointment = async id => {
    const eventsDoc = doc(db, "appointments", id);
    await deleteDoc(eventsDoc);
  };

  const commitChanges = useCallback(
    ({ added, changed, deleted }) => {
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

          updatedData = [
            ...updatedData,
            { id: startingAddedId, ...newAppointment },
          ];

          POSTAppointment({
            id: startingAddedId,
            ...newAppointment,
            // location: "Room 1",
          });
        }

        if (changed) {
          updatedData = updatedData.map(appointment => {
            const changeId = appointment.id;
            if (changed[changeId]) {
              const updatedAppointment = {
                ...appointment,
                ...changed[changeId],
              };

              PUTAppointment(changeId, updatedAppointment);
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
            DELETEAppointment(deletedAppointment.id);
          }
        }

        return updatedData;
      });
    },
    [setAppointments]
  );

  return {
    commitChanges,
    POSTAppointment,
    PUTAppointment,
    DELETEAppointment,
  };
};
