import moment from "moment";

export const convertToISO = dateStr => {
  return moment(dateStr).toISOString();
};
