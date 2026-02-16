const splitIsoString = (s) => {
  const [datePart] = s.split("T");
  const [year, month, day] = datePart.split("-");
  return {
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
    date: datePart
  };
};
const formatDateString = (dateString) => {
  const [datePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const yearNum = parseInt(year, 10);
  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);
  if (isNaN(yearNum) || isNaN(monthNum) || isNaN(dayNum)) {
    return dateString;
  }
  if (monthNum < 1 || monthNum > 12) {
    return dateString;
  }
  const monthName = monthNames[monthNum - 1];
  return `${monthName} ${dayNum}, ${yearNum}`;
};

export { formatDateString as f, splitIsoString as s };
