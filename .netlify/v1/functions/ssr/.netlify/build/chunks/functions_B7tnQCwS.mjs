import { s as splitIsoString } from './dates_BDkwdIRj.mjs';

const convertDateString = (dateString) => {
  const locale = "en-CA";
  const options = {
    dateStyle: "full",
    timeZone: "America/Edmonton"
  };
  const realDate = /* @__PURE__ */ new Date(`${dateString}T00:00:00-07:00`);
  return realDate.toLocaleString(locale, options);
};
const dateToDisplayFormat = (date, options = { time: true, date: true }) => {
  const locale = "en-CA";
  const showTime = options.time ?? true;
  const showDate = options.date ?? true;
  const parsedDate = new Date(date);
  const datePart = parsedDate.toLocaleDateString(locale, {
    dateStyle: "full",
    timeZone: "America/Edmonton"
  });
  const timePart = parsedDate.toLocaleTimeString(locale, {
    timeStyle: "short",
    timeZone: "America/Edmonton"
  });
  if (!showTime) {
    return datePart;
  }
  if (!showDate) {
    return timePart;
  }
  return `${datePart}, ${timePart}`;
};
const generateEventDateTimeString = ({
  start,
  end,
  startDate,
  startTime,
  endDate,
  endTime
}) => {
  let startString = "";
  let endString = "";
  if (start || end) {
    if (start) {
      startString = dateToDisplayFormat(start);
    }
    if (end) {
      const sameDate = start ? splitIsoString(start).date === splitIsoString(end).date : false;
      endString = dateToDisplayFormat(end, { date: !sameDate });
    }
  } else {
    if (startDate === endDate || startDate && !endDate) {
      startString = convertDateString(startDate);
    } else if (endDate) {
      startString = convertDateString(startDate);
      endString = convertDateString(endDate);
    }
    if (startTime) {
      startString = `${startString} ${startTime}`;
    }
    if (endTime) {
      endString = `${endString} ${endTime}`;
    }
  }
  return (endString ? `${startString} - ${endString}` : startString).replace(
    /\s+/g,
    " "
  );
};
const pathMatchesDestination = (path, destination) => {
  const pathSegments = path.split("/").filter((segment) => !!segment);
  const destinationSegments = destination.split("/").filter((segment) => !!segment);
  if (destinationSegments.length === 0) {
    return pathSegments.length === 0;
  }
  if (destinationSegments.length > pathSegments.length) {
    return false;
  }
  if (destinationSegments.length <= pathSegments.length && destinationSegments.every(
    (destinationSegment, index) => destinationSegment === pathSegments[index]
  )) {
    return true;
  }
  return false;
};
const getTodayString = () => {
  const today = /* @__PURE__ */ new Date();
  const offset = today.getTimezoneOffset();
  const todayWithOffset = new Date(today.getTime() - offset * 60 * 1e3);
  const todayString = todayWithOffset.toISOString().split("T")[0];
  return todayString;
};
const extractReferenceId = (ref) => {
  if (!ref) {
    return null;
  }
  if (typeof ref === "string") {
    return ref;
  }
  if (typeof ref === "object" && ref !== null && "id" in ref) {
    return ref.id;
  }
  return null;
};

export { getTodayString as a, extractReferenceId as e, generateEventDateTimeString as g, pathMatchesDestination as p };
