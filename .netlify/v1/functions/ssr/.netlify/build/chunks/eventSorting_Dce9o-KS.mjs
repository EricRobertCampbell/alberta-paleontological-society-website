const getEndDate = (frontmatter) => {
  if (frontmatter.endDate) {
    return frontmatter.endDate;
  }
  if (frontmatter.end) {
    return frontmatter.end.split("T")[0];
  }
  if (frontmatter.startDate) {
    return frontmatter.startDate;
  }
  if (frontmatter.start) {
    return frontmatter.start.split("T")[0];
  }
  return "";
};
const getStartDate = (frontmatter) => {
  if (frontmatter.startDate) {
    return frontmatter.startDate;
  }
  if (frontmatter.start) {
    return frontmatter.start.split("T")[0];
  }
  return "";
};
const sortEventsGenerator = (ascending) => {
  return (e1, e2) => {
    const start1 = getStartDate(e1.remarkPluginFrontmatter);
    const start2 = getStartDate(e2.remarkPluginFrontmatter);
    if (!start1 || !start2) {
      return 0;
    }
    return ascending ? start1.localeCompare(start2) : start2.localeCompare(start1);
  };
};
const sortEventsAsc = sortEventsGenerator(true);
const sortEventsDesc = sortEventsGenerator(false);
const sortEventsByDate = (events) => {
  const today = /* @__PURE__ */ new Date();
  const offset = today.getTimezoneOffset();
  const todayWithOffset = new Date(today.getTime() - offset * 60 * 1e3);
  const todayString = todayWithOffset.toISOString().split("T")[0];
  const upcomingEvents = [];
  const pastEvents = [];
  events.forEach((event) => {
    const endDate = getEndDate(event.remarkPluginFrontmatter);
    if (endDate >= todayString) {
      upcomingEvents.push(event);
    } else {
      pastEvents.push(event);
    }
  });
  upcomingEvents.sort(sortEventsAsc);
  pastEvents.sort(sortEventsDesc);
  return {
    upcomingEvents,
    pastEvents
  };
};

export { getEndDate as a, getStartDate as g, sortEventsByDate as s };
