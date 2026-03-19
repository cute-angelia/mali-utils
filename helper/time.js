/**
 * Parses "Month DD, YYYY" into "YYYY-MM-DD"
 */
export const parseLongDate = (dateStr) => {
  const d = new Date(dateStr);

  // Check if the date is valid
  if (isNaN(d.getTime())) return null;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
