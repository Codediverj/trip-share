export const formatDate = (dateStr: Date) => {
  const date = new Date(dateStr);
  return date.toDateString();
};
