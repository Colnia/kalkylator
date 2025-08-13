export const KALKYLATOR_TYPER = {
  LUFT_LUFT: "luft-luft",
  REPARATION: "reparation",
} as const

export const MOMS = 0.25
export const ROT_PROCENT = 0.5
export const MAX_ROT = 50000

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
