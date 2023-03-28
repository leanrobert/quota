const getFirstAndLastDay = date => {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Create a new date object for the first day of the month
  const firstDayOfMonth = new Date(year, month, 1);
  firstDayOfMonth.setHours(0, 0, 0, 0);

  // Create a new date object for the last day of the month
  const lastDayOfMonth = new Date(year, month + 1, 0);
  lastDayOfMonth.setHours(23, 59, 59, 999);
  lastDayOfMonth.setMilliseconds(lastDayOfMonth.getMilliseconds() - lastDayOfMonth.getTimezoneOffset() * 60 * 1000)

  // Return an object with the first and last day of the month
  return { firstDayOfMonth, lastDayOfMonth };
}

export { getFirstAndLastDay }