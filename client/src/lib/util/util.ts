import { format, type DateArg } from "date-fns";

export function formatDate(
  date: DateArg<Date> = new Date(),
  pattern = "dd MMM yyyy h:mm a"
): string {
  return format(new Date(date), pattern);
}
