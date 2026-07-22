import { format } from "date-fns";

export const formatDate = (date: Date) => {
  try {
    return format(new Date(date), "dd MMM yyyy");
  } catch {
    return "-";
  }
};
