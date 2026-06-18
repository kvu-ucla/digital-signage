import type { LocationConfig } from '@/lib/types'

export const LOCATIONS: Record<string, LocationConfig> = {
  'bruinplate': {
    displayName: 'Bruin Plate',
    gid: '932045808',
    xmlUrl: 'https://ucla-xml-cdn.integrations.jamix.com/BoardInterface/BruinPlate',
    stylesheet: 'bruinplate.css',
  },
  'cafe1919': {
    displayName: 'Cafe 1919',
    gid: '677512158',
    xmlUrl: 'https://ucla-xml-cdn.integrations.jamix.com/BoardInterface/Cafe1919',
    stylesheet: 'example-location.css',
    screens: {
      Mains: {
        menus: ["breakfast", "lunch", "dinner"],
        type: "horizontal",
        requiresStation: true,
        stations: [
          "PIZZETTE",
          "PANINI",
          "SOFT BAKED PRETZEL",
          "SC PRETZEL SAUCE",
        ],
      },
    },
  },
  'rendezvous': {
    displayName: 'Rendezvous',
    gid: "1622975910",
    xmlUrl: 'https://ucla-xml-cdn.integrations.jamix.com/BoardInterface/Rendezvous',
    stylesheet: 'example-location.css',
    screens: {
      'West-byo': {
        menus: ["breakfast", "lunch", "dinner"],
        type: "horizontal",
        requiresStation: false,
      },
    },
  },
  'example-entrance': {
    displayName: 'Example Entrance',
    xmlUrl: 'https://REPLACE_WITH_YOUR_JAMIX_XML_URL',
    gid: 'REPLACE_WITH_YOUR_GOOGLE_SHEET_GID',
    stylesheet: 'example-location.css',
  },
  'covelepicuria': {
    displayName: 'Epicuria at Covel',
    xmlUrl: 'https://ucla-xml-cdn.integrations.jamix.com/BoardInterface/CovelEpicuria',
    gid: '1777114522',
    stylesheet: 'covelepicuria.css',
  }
}
