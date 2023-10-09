export interface LinkInformation {
    destination: string
    label: string
    subheadings?: Array<LinkInformation>
}
export const links: Array<LinkInformation> = [
    { destination: '/', label: 'Home' },
    {
        destination: '/events/',
        label: 'Events',
        subheadings: [
            {
                destination: '/events/monthlymeetings',
                label: 'Monthly Meetings',
            },
            {
                destination: '/events/fieldtrips',
                label: 'Field Trips',
            },
            {
                destination: '/events/fieldtrippictures',
                label: 'Field Trip Pictures',
            },
            { destination: '/events/agm', label: 'Annual General Meeting' },
            { destination: '/events/symposium', label: 'Symposium' },
        ],
    },
    {
        destination: '/resources/',
        label: 'Resources',
        subheadings: [
            { destination: '/resources/library', label: 'Library' },
            {
                destination: '/resources/fossilcollection',
                label: 'Fossil Collection',
            },
            { destination: '/resources/bulletin', label: 'Bulletin' },
            {
                destination: '/resources/bulletinarchives',
                label: 'Bulletin Archives',
            },
            { destination: '/resources/links', label: 'Links' },
            {
                destination: '/resources/opensourcepublications',
                label: 'Open Source Publications',
            },
            { destination: '/resources/faq', label: 'FAQ' },
        ],
    },
    { destination: '/store/', label: 'Store' },
    {
        destination: '/about/',
        label: 'About Us',
        subheadings: [
            { destination: '/about/whoswho', label: "Who's Who" },
            { destination: '/about/volunteers', label: 'Volunteers' },
        ],
    },
    {
        destination: '/members/',
        label: 'Membership',
        subheadings: [
            { destination: '/members/membersguide/', label: "Members' Guide" },
        ],
    },
    { destination: '/hopejohnsonaward', label: 'Awards' },
    { destination: '/privacypolicy/', label: 'Privacy Policy' },
]
