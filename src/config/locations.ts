import type { LocationConfig } from '../lib/types'

export const LOCATIONS: Record<string, LocationConfig> = {
  'bruinplate': {
    displayName: 'Bruin Plate',
    xmlUrl: 'https://ucla-xml-cdn.integrations.jamix.com/BoardInterface/BruinPlate',
    stylesheet: 'example-location.css',
  },
  'example-entrance': {
    displayName: 'Example Entrance',
    xmlUrl: 'https://REPLACE_WITH_YOUR_JAMIX_XML_URL',
    gid: 'REPLACE_WITH_YOUR_GOOGLE_SHEET_GID',
    stylesheet: 'example-location.css',
  },
}
