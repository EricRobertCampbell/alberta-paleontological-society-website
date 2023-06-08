import type { EventFrontmatter } from "../content/config";

/**
 * https://stackoverflow.com/questions/39223481/incorrect-date-shown-in-new-date-in-javascript
 */
const convertDateToUTC = (date: Date): Date => {
	return new Date(
		date.getUTCFullYear(),
		date.getUTCMonth(),
		date.getUTCDate(),
		date.getUTCHours(),
		date.getUTCMinutes(),
		date.getUTCSeconds()
	);
};
const convertDateString = (dateString: string): string => {
	const locale = "en-CA";
	const options: Intl.DateTimeFormatOptions = {
		dateStyle: "full",
		timeZone: "America/Edmonton",
	};
	return convertDateToUTC(new Date(dateString)).toLocaleDateString(
		locale,
		options
	);
};
export const generateEventDateTimeString = (
	startDate: EventFrontmatter["startDate"],
	startTime: EventFrontmatter["startTime"],
	endDate: EventFrontmatter["endDate"],
	endTime: EventFrontmatter["endTime"]
): string => {
	let start: string = "";
	let end: string = "";
	if (startDate === endDate || (startDate && !endDate)) {
		start = convertDateString(startDate);
	} else if (endDate) {
		start = convertDateString(startDate);
		end = convertDateString(endDate);
	}

	if (startTime) {
		start = `${start} ${startTime}`;
	}
	if (endTime) {
		end = `${end} ${endTime}`;
	}
	return (end ? `${start} - ${end}` : start).replace(/\s+/g, " ");
};

export const pathMatchesDestination = (path: string, destination: string) => {
	/* console.log({ path, destination }); */
	if (path === "") {
		// we're at the home page
		/* console.log('Testing agains the home page:', destination === '/') */
		return destination === "/";
	}

	const segments = destination.split("/").filter((elem) => !!elem);
	/* console.log({ segments }) */
	const lastSegment = segments.at(-1);
	/* console.log({ lastSegment, path }) */
	if (!lastSegment) {
		return false;
	}
	const match = new RegExp(path, "i").test(lastSegment);
	/* console.log({ match }) */
	/* console.log() */
	return match;
};
