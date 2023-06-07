const eventTypes = [
	"Special joint meeting of the APS and CSPG BASS division",
	"Short Presentations",
	"Normal Presentations",
] as const;
type EventType = typeof eventTypes[number];

interface Event {
	date: Date;
	startTime?: string;
	endTime?: string;
	title: string;
	speaker: string;
	abstractLocation?: string;
	eventType: EventType;
}

export const events: Array<Event> = [];
