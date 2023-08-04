export const totaldays = (startDate: Date, endDate: Date) => {
  const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
  const start = new Date(startDate); // Create a new Date object to avoid modifying the original date
  const end = new Date(endDate);
  const diffDays = Math.round(Math.abs((start.getTime() - end.getTime()) / oneDay));
  return diffDays;
};
