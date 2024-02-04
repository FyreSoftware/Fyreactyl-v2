import moment from "moment";

export function calculateDate(type: "Weekly" | "Monthly" | "Yearly") {
  const date = moment();

  if (type === "Weekly") {
    date.add("7", "days");
  } else if (type === "Monthly") {
    date.add("1", "month");
  } else if (type === "Yearly") {
    date.add("1", "year");
  }

  return date.toDate();
}
