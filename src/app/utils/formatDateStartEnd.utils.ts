export const formatDateStartEnd = (startDate: Date, endDate: Date) => {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  const startStr = startDate.toLocaleDateString(undefined, {
    //weekday: "short",
    month: "short",
    day: "numeric",
  });
  const endStr = endDate.toLocaleDateString(undefined, {
    //weekday: "short",
    month: "short",
    day: "numeric",
  });

  if (startYear === endYear) {
    return `${startStr} ~ ${endStr}, ${endYear}`;
  } else {
    return `${startStr}, ${startYear} ~ ${endStr}, ${endYear}`;
  }
};
