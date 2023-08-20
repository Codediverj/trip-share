export const totaldays = (startDate: Date, endDate: Date) => {
  const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
  const start = new Date(startDate); // Create a new Date object to avoid modifying the original date
  const end = new Date(endDate);

  // Ensure that the start date is before or equal to the end date
  if (start > end) {
    throw new Error("Start date must be before or equal to end date.");
  }

  // Calculate the difference in days (inclusive of start and end days)
  const diffDays = Math.floor((end.getTime() - start.getTime()) / oneDay) + 1;
  return diffDays;
};
