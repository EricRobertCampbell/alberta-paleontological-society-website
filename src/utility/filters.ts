import { APS_HOST_NAME } from './constants'

/**
 * Filter function to determine if an event is hosted by the Alberta Paleo Society (APS).
 */
export const filterAPSEvents = ({ host }: { host?: string }): boolean => {
    return !host || host === APS_HOST_NAME
}

/**
 * Filter function to determine if an event is not hosted by the Alberta Paleo Society (APS).
 * This is the inverse of `filterAPSEvents`.
 */
export const filterExternalEvents = ({ host }: { host?: string }): boolean => {
    return !filterAPSEvents({ host })
}
