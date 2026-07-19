import type { LocationConfig } from "@/lib/types";

export const LOCATIONS: Record<string, LocationConfig> = {
  bruinplate: {
    displayName: "Bruin Plate",
    gid: "932045808",
    xmlUrl:
      "https://ucla-xml-cdn.integrations.jamix.com/BoardInterface/BruinPlate",
    stylesheet: "bruinplate.css",
  },
  denevedining: {
    displayName: "De Neve Dining",
    gid: "1858868942",
    xmlUrl:
      "https://ucla-xml-cdn.integrations.jamix.com/BoardInterface/DeNeveDining",
    stylesheet: "deneve.css",
  },
  cafe1919: {
    displayName: "Cafe 1919",
    gid: "677512158",
    xmlUrl:
      "https://ucla-xml-cdn.integrations.jamix.com/BoardInterface/Cafe1919",
    stylesheet: "cafe1919.css",
    screens: {
      Page1: {
        type: "horizontal",
        requiresStation: false,
      },
      Page2: {
        type: "horizontal",
        requiresStation: false,
      },
      Page3: {
        type: "horizontal",
        requiresStation: false,
      },
      Page4: {
        type: "vertical",
        requiresStation: false,
      },
      Entrance: {
        type: "entrance",
        requiresStation: false,
      },
    },
  },
  rendezvous: {
    displayName: "Rendezvous",
    gid: "1622975910",
    xmlUrl:
      "https://ucla-xml-cdn.integrations.jamix.com/BoardInterface/Rendezvous",
    stylesheet: "example-location.css",
    screens: {
      "West-byo": {
        menus: ["breakfast", "lunch", "dinner"],
        type: "horizontal",
        requiresStation: false,
      },
    },
  },
  covelepicuria: {
    displayName: "Epicuria at Covel",
    xmlUrl:
      "https://ucla-xml-cdn.integrations.jamix.com/BoardInterface/CovelEpicuria",
    gid: "1777114522",
    stylesheet: "covelepicuria.css",
  },
    epicatackerman: {
    displayName: "Epicuria at Ackerman",
    gid: "2027043595",
    xmlUrl:
      "https://ucla-xml-cdn.integrations.jamix.com/BoardInterface/EpicatAckerman",
    stylesheet: "epicatackerman.css",
    screens: {
      left: {
        type: "horizontal",
        requiresStation: false,
      },
      center: {
        type: "horizontal",
        requiresStation: false,
      },
      right: {
        type: "horizontal",
        requiresStation: false,
      },
    },
  },
};
