const defineMonthDates = (monthName = null) => {
  const today = new Date()
  const year = today.getFullYear()
  let month

  if (monthName) {
    month = new Date(`${monthName} 1, ${year}`).getMonth() + 1
  } else {
    month = today.getMonth() + 1
  }

  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  const format = date => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  const firstDayFormatted = format(firstDayOfMonth);
  const lastDayFormatted = format(lastDayOfMonth)

  return { start: firstDayFormatted, end: lastDayFormatted }
}
