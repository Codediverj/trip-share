export const formatDateStartEnd = (startDate: Date, endDate: Date) => {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  const startStr = startDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const endStr = endDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  if (startYear === endYear) {
    if (startDate.getMonth() === endDate.getMonth() && startDate.getDate() === endDate.getDate()) {
      return `${endStr}, ${endYear}`;
    } else {
      return `${startStr} ~ ${endStr}, ${endYear}`;
    }
  } else {
    return `${startStr}, ${startYear} ~ ${endStr}, ${endYear}`;
  }
};
