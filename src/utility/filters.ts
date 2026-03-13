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

const HOST_LOGO_MAP: Record<string, string> = {
    [APS_HOST_NAME]: '/logos/aps-logo.gif',
    'University of Alberta Palaeontological Society': '/logos/UofAPS_logo.jpg',
    'University of Saskatchewan Palaeobiology Club': '/logos/usask_pbio_logo.jpg',
    'Royal Tyrrell Museum of Palaeontology': '/logos/rtmp_logo.jpg',
    'Royal Tyrrell Museum': '/logos/rtmp_logo.jpg',
    'Philip J. Currie Dinosaur Museum': '/logos/pjcdm-logo.svg',
    'Royal Alberta Museum': '/logos/ram_logo.png',
    "Devil's Coulee Dinosaur Heritage Museum": '/logos/devils_coulee_logo.png',
    'Tumbler Ridge Museum': '/logos/tumbler-ridge-museum.png',
}

/**
 * Returns the logo path for the organization hosting the event, or an empty string if none.
 */
export const getHostLogoLocation = ({ host }: { host?: string }): string => {
    if (!host || host === APS_HOST_NAME) {
        return HOST_LOGO_MAP[APS_HOST_NAME] ?? ''
    }
    return HOST_LOGO_MAP[host] ?? ''
}
