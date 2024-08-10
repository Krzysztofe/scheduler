import { useCallback } from "react";
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

import performFirestoreOperation from "../services/newFetch";

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

          performFirestoreOperation("POST", "appointments", null, {
            id: startingAddedId,
            ...newAppointment,
          });

          updatedData = [
            ...updatedData,
            { id: startingAddedId, ...newAppointment },
          ];

          // POSTAppointment({
          //   id: startingAddedId,
          //   ...newAppointment,
          // });
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

// import { useCallback } from "react";
// import { useMutation } from "@tanstack/react-query";
// import firestoreOperations from "../services/fetch";

// const POSTAppointment = (added, updatedData) => {
//   const { mutateAsync: addAppointment } = useMutation({
//     mutationFn: newAppointment =>
//       firestoreOperations("POST", "appointments", null, newAppointment),
//   });
//   if (added) {
//     const startingAddedId =
//       updatedData.length > 0 ? updatedData[updatedData.length - 1].id + 1 : 0;

//     const newAppointment = {
//       ...added,
//       startDate: added.startDate.toString(),
//       endDate: added.endDate.toString(),
//     };

//     try {
//       addAppointment({
//         id: startingAddedId,
//         ...newAppointment,
//       });

//       updatedData = [
//         ...updatedData,
//         { id: startingAddedId, ...newAppointment },
//       ];
//     } catch (error) {
//       throw error;
//     }
//   }
// };

// export const useAppointmentActions = setAppointments => {
//   // const { mutateAsync: addAppointment } = useMutation({
//   //   mutationFn: newAppointment =>
//   //     firestoreOperations("POST", "appointments", null, newAppointment),
//   // });

//   const { mutateAsync: updateAppointment } = useMutation({
//     mutationFn: ({ id, newDetails }) =>
//       firestoreOperations("PUT", "appointments", id, newDetails),
//   });

//   const { mutateAsync: deleteAppointment } = useMutation({
//     mutationFn: id => firestoreOperations("DELETE", "appointments", id),
//   });

//   const commitChanges = useCallback(
//     async ({ added, changed, deleted }) => {
//       setAppointments(prevData => {
//         let updatedData = [...prevData];

//         POSTAppointment(added, updatedData);

//         // Handle added appointments
//         // if (added) {
//         //   const startingAddedId =
//         //     updatedData.length > 0
//         //       ? updatedData[updatedData.length - 1].id + 1
//         //       : 0;

//         //   const newAppointment = {
//         //     ...added,
//         //     startDate: added.startDate.toString(),
//         //     endDate: added.endDate.toString(),
//         //   };

//         //   try {
//         //     addAppointment({
//         //       id: startingAddedId,
//         //       ...newAppointment,
//         //     });

//         //     updatedData = [
//         //       ...updatedData,
//         //       { id: startingAddedId, ...newAppointment },
//         //     ];
//         //   } catch (error) {
//         //     throw error;
//         //   }
//         // }

//         // Handle changed appointments
//         if (changed) {
//           const updatedAppointments = Promise.all(
//             updatedData.map(async appointment => {
//               const changeId = appointment.id;
//               if (changed[changeId]) {
//                 const updatedAppointment = {
//                   ...appointment,
//                   ...changed[changeId],
//                 };

//                 try {
//                   await updateAppointment({
//                     id: changeId,
//                     newDetails: updatedAppointment,
//                   });
//                 } catch (error) {
//                   console.error("Failed to update appointment:", error);
//                   throw error;
//                 }

//                 return updatedAppointment;
//               }
//               return appointment;
//             })
//           );
//           updatedData = updatedAppointments;
//         }

//         // Handle deleted appointments
//         if (deleted !== undefined) {
//           const deletedAppointment = updatedData.find(
//             appointment => appointment.id === deleted
//           );
//           updatedData = updatedData.filter(
//             appointment => appointment.id !== deleted
//           );

//           if (deletedAppointment) {
//             try {
//               deleteAppointment(deletedAppointment.id);
//             } catch (error) {
//               console.error("Failed to delete appointment:", error);
//               throw error;
//             }
//           }
//         }
//         return updatedData;
//       });
//     },
//     [POSTAppointment, updateAppointment, deleteAppointment, setAppointments]
//   );

//   return {
//     commitChanges,
//   };
// };
