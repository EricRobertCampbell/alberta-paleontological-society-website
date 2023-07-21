export interface LinkInformation {
	destination: string;
	label: string;
	subheadings?: Array<LinkInformation>;
}
export const links: Array<LinkInformation> = [
	{ destination: "/", label: "Home" },
	{
		destination: "/events/",
		label: "Events",
		subheadings: [
			{
				destination: "/events/monthlymeetings",
				label: "Monthly Meetings",
			},
			{
				destination: "/events/fieldtrips",
				label: "Field Trips",
			},
		],
	},
];
