import { useState } from "react";

import "./App.css";
import Calendar from "./Calendar";
import Demo from "./Demo";


function App() {


  return (
    <>
      {/* <Demo /> */}
      <Calendar />;
    </>

  );
  // return <Demo />;
}

export default App;


// const CustomAppointmentFormLayout = ({
//   onFieldChange,
//   appointmentData,
//   ...restProps
// }) => (
//   <AppointmentForm.BasicLayout
//     appointmentData={appointmentData}
//     onFieldChange={onFieldChange}
//     {...restProps}
//   >
//     {/* Title Field */}
//     <AppointmentForm.Label text="Tytuł" type="titleLabel" />
//     <AppointmentForm.TextEditor
//       value={appointmentData.title}
//       name="title"
//       onValueChange={onFieldChange}
//       placeholder="Tytuł"
//     />

//     {/* Start Date Field */}
//     <AppointmentForm.Label text="Data rozpoczęcia" type="startDateLabel" />
//     <AppointmentForm.DateEditor
//       value={appointmentData.startDate}
//       onValueChange={onFieldChange}
//       name="startDate"
//     />

//     {/* End Date Field */}
//     <AppointmentForm.Label text="Data zakończenia" type="endDateLabel" />
//     <AppointmentForm.DateEditor
//       value={appointmentData.endDate}
//       onValueChange={onFieldChange}
//       name="endDate"
//     />
//   </AppointmentForm.BasicLayout>
// );