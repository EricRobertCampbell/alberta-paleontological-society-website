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

export { splitIsoString as s };
