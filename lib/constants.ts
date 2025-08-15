export const KALKYLATOR_TYPER = {
  LUFT_LUFT: "luft-luft",
  REPARATION: "reparation",
} as const

export const MOMS = 0.25
export const ROT_PROCENT = 0.5
export const MAX_ROT = 50000
export const FÖRETAG_PÅSLAG = 0.3 // 30% markup on spare parts

export const MATERIAL_PRISER = {
  KOSTNAD_TIM: 550,
  BILKOSTNAD: 350,
  KYLRÖR: 62,
  KANAL: 52,
  KANAL_DELAR: 45,
  ELKABEL_4G: 21,
  ELKABEL_3G: 16,
  BENSTATIV: 388,
  VIBRATIONSDÄMPARE: 44,
  SKRUV_BUNT: 125,
  SLITAGE_VERKTYG: 200,
  EXTRA_RÖRLÄNGD: 558,
} as const

export const STANDARD_INSTALLATION = {
  TIMMAR: 5,
  STANDARD_RÖRLÄNGD: 5,
  MATERIAL: {
    BILKOSTNAD: 1,
    KYLRÖR: 5,
    KANAL: 5,
    KANAL_DELAR: 3,
    ELKABEL_4G: 5,
    ELKABEL_3G: 3,
    BENSTATIV: 1,
    VIBRATIONSDÄMPARE: 1,
    SKRUV_BUNT: 1,
    SLITAGE_VERKTYG: 1,
  },
} as const

export const VÄRMEPUMPSSERIER = {
  SUMO: "SUMO",
  HERO: "HERO",
  DESIGN: "DESIGN",
  NINJA: "NINJA",
  DOJO: "DOJO",
  AY: "AY",
  MITSUBISHI: "MITSUBISHI",
  DAIKIN: "DAIKIN",
  PANASONIC: "PANASONIC",
} as const

// Added legacy VÄRMEPUMPAR export for backward compatibility
export const VÄRMEPUMPAR = [
  {
    id: 1,
    model: "Mitsubishi MSZ-LN25VG",
    kampanj: 15900,
    ordinarie: 18900,
    installationspris: 8500,
  },
  {
    id: 2,
    model: "Daikin FTXM25R",
    kampanj: 16500,
    ordinarie: 19500,
    installationspris: 8500,
  },
  {
    id: 3,
    model: "Panasonic CS-TZ25WKEW",
    kampanj: 14900,
    ordinarie: 17900,
    installationspris: 8500,
  },
] as const

export const VÄRMEPUMPAR_DETALJERAD = {
  Mitsubishi: {
    "MSZ-LN": {
      "2.5kW": {
        model: "MSZ-LN25VG",
        effekt: "2.5 kW",
        ordinarie: 18900,
        kampanj: 15900,
        installationspris: 8500,
        namn: "Mitsubishi MSZ-LN25VG",
      },
      "3.5kW": {
        model: "MSZ-LN35VG",
        effekt: "3.5 kW",
        ordinarie: 21900,
        kampanj: 18900,
        installationspris: 8500,
        namn: "Mitsubishi MSZ-LN35VG",
      },
      "5.0kW": {
        model: "MSZ-LN50VG",
        effekt: "5.0 kW",
        ordinarie: 24900,
        kampanj: 21900,
        installationspris: 8500,
        namn: "Mitsubishi MSZ-LN50VG",
      },
    },
    "MSZ-AP": {
      "2.5kW": {
        model: "MSZ-AP25VG",
        effekt: "2.5 kW",
        ordinarie: 16900,
        kampanj: 14900,
        installationspris: 8500,
        namn: "Mitsubishi MSZ-AP25VG",
      },
      "3.5kW": {
        model: "MSZ-AP35VG",
        effekt: "3.5 kW",
        ordinarie: 19900,
        kampanj: 17900,
        installationspris: 8500,
        namn: "Mitsubishi MSZ-AP35VG",
      },
    },
    SUMO: {
      "6.0kW": {
        model: "SUMO 6",
        effekt: "6.0 kW",
        ordinarie: 24900,
        kampanj: 19900,
        installationspris: 8500,
        namn: "Mitsubishi SUMO 6",
      },
      "8.0kW": {
        model: "SUMO 8",
        effekt: "8.0 kW",
        ordinarie: 27900,
        kampanj: 22900,
        installationspris: 8500,
        namn: "Mitsubishi SUMO 8",
      },
      "12.0kW": {
        model: "SUMO 12",
        effekt: "12.0 kW",
        ordinarie: 32900,
        kampanj: 27900,
        installationspris: 9500,
        namn: "Mitsubishi SUMO 12",
      },
    },
    NINJA: {
      "6.0kW": {
        model: "NINJA 6",
        effekt: "6.0 kW",
        ordinarie: 19900,
        kampanj: 16900,
        installationspris: 8500,
        namn: "Mitsubishi NINJA 6",
      },
      "8.0kW": {
        model: "NINJA 8",
        effekt: "8.0 kW",
        ordinarie: 22900,
        kampanj: 19900,
        installationspris: 8500,
        namn: "Mitsubishi NINJA 8",
      },
      "12.0kW": {
        model: "NINJA 12",
        effekt: "12.0 kW",
        ordinarie: 28900,
        kampanj: 24900,
        installationspris: 9500,
        namn: "Mitsubishi NINJA 12",
      },
    },
    HERO: {
      "6.0kW": {
        model: "HERO 6",
        effekt: "6.0 kW",
        ordinarie: 29900,
        kampanj: 24900,
        installationspris: 8500,
        namn: "Mitsubishi HERO 6",
      },
      "8.0kW": {
        model: "HERO 8",
        effekt: "8.0 kW",
        ordinarie: 32900,
        kampanj: 27900,
        installationspris: 8500,
        namn: "Mitsubishi HERO 8",
      },
      "12.0kW": {
        model: "HERO 12",
        effekt: "12.0 kW",
        ordinarie: 38900,
        kampanj: 33900,
        installationspris: 9500,
        namn: "Mitsubishi HERO 12",
      },
    },
    DESIGN: {
      "6.0kW": {
        model: "DESIGN 6",
        effekt: "6.0 kW",
        ordinarie: 34900,
        kampanj: 29900,
        installationspris: 8500,
        namn: "Mitsubishi DESIGN 6",
      },
      "8.0kW": {
        model: "DESIGN 8",
        effekt: "8.0 kW",
        ordinarie: 37900,
        kampanj: 32900,
        installationspris: 8500,
        namn: "Mitsubishi DESIGN 8",
      },
    },
  },
  Daikin: {
    FTXM: {
      "2.5kW": {
        model: "FTXM25R",
        effekt: "2.5 kW",
        ordinarie: 19500,
        kampanj: 16500,
        installationspris: 8500,
        namn: "Daikin FTXM25R",
      },
      "3.5kW": {
        model: "FTXM35R",
        effekt: "3.5 kW",
        ordinarie: 22500,
        kampanj: 19500,
        installationspris: 8500,
        namn: "Daikin FTXM35R",
      },
      "5.0kW": {
        model: "FTXM50R",
        effekt: "5.0 kW",
        ordinarie: 25500,
        kampanj: 22500,
        installationspris: 8500,
        namn: "Daikin FTXM50R",
      },
    },
    FTXS: {
      "2.5kW": {
        model: "FTXS25K",
        effekt: "2.5 kW",
        ordinarie: 17900,
        kampanj: 15900,
        installationspris: 8500,
        namn: "Daikin FTXS25K",
      },
      "3.5kW": {
        model: "FTXS35K",
        effekt: "3.5 kW",
        ordinarie: 20900,
        kampanj: 18900,
        installationspris: 8500,
        namn: "Daikin FTXS35K",
      },
    },
  },
  Panasonic: {
    "CS-TZ": {
      "2.5kW": {
        model: "CS-TZ25WKEW",
        effekt: "2.5 kW",
        ordinarie: 17900,
        kampanj: 14900,
        installationspris: 8500,
        namn: "Panasonic CS-TZ25WKEW",
      },
      "3.5kW": {
        model: "CS-TZ35WKEW",
        effekt: "3.5 kW",
        ordinarie: 20900,
        kampanj: 17900,
        installationspris: 8500,
        namn: "Panasonic CS-TZ35WKEW",
      },
    },
    "CS-KIT": {
      "2.5kW": {
        model: "CS-KIT-TZ25WKEW",
        effekt: "2.5 kW",
        ordinarie: 16900,
        kampanj: 14900,
        installationspris: 8500,
        namn: "Panasonic CS-KIT-TZ25WKEW",
      },
      "3.5kW": {
        model: "CS-KIT-TZ35WKEW",
        effekt: "3.5 kW",
        ordinarie: 19900,
        kampanj: 17900,
        installationspris: 8500,
        namn: "Panasonic CS-KIT-TZ35WKEW",
      },
    },
  },
  LG: {
    Artcool: {
      "2.5kW": {
        model: "AC09BQ",
        effekt: "2.5 kW",
        ordinarie: 18900,
        kampanj: 16900,
        installationspris: 8500,
        namn: "LG Artcool AC09BQ",
      },
      "3.5kW": {
        model: "AC12BQ",
        effekt: "3.5 kW",
        ordinarie: 21900,
        kampanj: 19900,
        installationspris: 8500,
        namn: "LG Artcool AC12BQ",
      },
    },
    Standard: {
      "2.5kW": {
        model: "S09EQ",
        effekt: "2.5 kW",
        ordinarie: 16900,
        kampanj: 14900,
        installationspris: 8500,
        namn: "LG Standard S09EQ",
      },
      "3.5kW": {
        model: "S12EQ",
        effekt: "3.5 kW",
        ordinarie: 19900,
        kampanj: 17900,
        installationspris: 8500,
        namn: "LG Standard S12EQ",
      },
    },
  },
} as const

export const INSTALLATION_TYPER = {
  STANDARD: "standard",
  UTBYTE: "utbyte",
  KOMPLEX: "komplex",
} as const

export const VÄGG_TYPER = {
  TRÄ: "trä",
  TEGEL: "tegel",
  BETONG: "betong",
} as const

export const PLACERINGAR = {
  MARK: "mark",
  VÄGG: "vägg",
  BALKONG: "balkong",
  TAK: "tak",
} as const

export const INSTALLATION_PRISER = {
  STANDARD: 4500,
  UTBYTE: 3500,
  KOMPLEX: 6500,
  VÄGG_TILLÄGG: {
    TRÄ: 0,
    TEGEL: 500,
    BETONG: 1000,
  },
  PLACERING_TILLÄGG: {
    MARK: 0,
    VÄGG: 300,
    BALKONG: 500,
    TAK: 1200,
  },
} as const

export const EXTRA_MATERIAL_PRISER = {
  KONSOLSATS: 450,
  VÄRMEKABEL: 890,
  KONDENSVATTENSLANG: 125,
  EXTRA_RÖRLÄNGD_PER_METER: 558,
} as const

export const REPARATION_PRISER = {
  TIMPRIS: 795,
  FRAMKÖRNING: 350,
  CERTIFIERING: 500,
  PROVTRYCKNING_UNDER_3KG: 800,
  PROVTRYCKNING_ÖVER_3KG: 1200,
  SVETS_MATERIAL: 800,
  RESA_PER_KM: 18.5,
} as const

export const KÖLDMEDIA_TYPER = {
  R134a: { namn: "R134a", pris: 628.4 },
  R290: { namn: "R290 (Propan)", pris: 204.6 },
  R32: { namn: "R32", pris: 311.5 },
  R404A: { namn: "R404A", pris: 1129.6 },
  R407C: { namn: "R407C", pris: 823.0 },
  R410A: { namn: "R410A", pris: 964.0 },
  R448A: { namn: "R448A", pris: 1136.0 },
  R449A: { namn: "R449A", pris: 836.0 },
  R452A: { namn: "R452A", pris: 1110.0 },
  R454C: { namn: "R454C", pris: 526.0 },
  R507A: { namn: "R507A", pris: 1207.5 },
  R513A: { namn: "R513A", pris: 616.44 },
  R744: { namn: "R744 (CO2)", pris: 49.17 },
  R1234yf: { namn: "R1234yf", pris: 890.0 },
} as const

export const FELSÖKNING_TYPER = {
  GRUNDLÄGGANDE: {
    namn: "Grundläggande felsökning",
    beskrivning: "Visuell kontroll, mätningar, grundläggande diagnostik",
    pris: 1200,
  },
  AVANCERAD: {
    namn: "Avancerad felsökning",
    beskrivning: "Djupgående diagnostik, komponenttestning, systemanalys",
    pris: 2400,
  },
  ELEKTRONISK: {
    namn: "Elektronisk felsökning",
    beskrivning: "Kretskortanalys, sensortestning, styrsystemsdiagnostik",
    pris: 1800,
  },
  LÄCKAGESÖKNING: {
    namn: "Läckagesökning",
    beskrivning: "Systematisk läckagesökning med specialverktyg",
    pris: 1500,
  },
  PRESTANDA: {
    namn: "Prestandaanalys",
    beskrivning: "Kapacitets- och effektivitetsmätning, systemoptimering",
    pris: 2000,
  },
} as const
