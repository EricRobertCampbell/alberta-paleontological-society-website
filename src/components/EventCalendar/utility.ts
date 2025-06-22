export const getEventTypeClass = (eventType: string) => {
    switch (eventType) {
        case 'Monthly Meeting':
            return 'event-monthly-meeting'
        case 'Symposium':
            return 'event-symposium'
        case 'Field Trip':
            return 'event-field-trip'
        case 'Special Joint Meeting of the APS and the CSPG BASS Division':
            return 'event-default'
        case 'Fossil Sorting':
            return 'event-fossil-sorting'
        case 'External':
            return 'event-external'
        default:
            return 'event-default'
    }
}
