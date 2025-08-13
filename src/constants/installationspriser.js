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
    EXTRA_RÖRLÄNGD: 558 // Per meter, exkl moms
};

export const STANDARD_INSTALLATION = {
    TIMMAR: 5,
    STANDARD_RÖRLÄNGD: 5, // meter
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
        SLITAGE_VERKTYG: 1
    }
};

export const UTBYTES_INSTALLATION = {
    TIMMAR: 4,
    STANDARD_RÖRLÄNGD: 5, // meter
    MATERIAL: {
        BILKOSTNAD: 1,
        KYLRÖR: 5,
        KANAL: 2,
        KANAL_DELAR: 2,
        ELKABEL_4G: 5,
        ELKABEL_3G: 3,
        BENSTATIV: 1,
        VIBRATIONSDÄMPARE: 1,
        SKRUV_BUNT: 1,
        SLITAGE_VERKTYG: 1
    }
};

// Beräkna materialkostnad
const beräknaMaterialKostnad = (material, priser) => {
    return Object.entries(material).reduce((total, [key, antal]) => {
        return total + (priser[key] * antal);
    }, 0);
};

export const INSTALLATION_KOSTNADER = {
    STANDARD: {
        ARBETSKOSTNAD: (STANDARD_INSTALLATION.TIMMAR * MATERIAL_PRISER.KOSTNAD_TIM) + MATERIAL_PRISER.BILKOSTNAD,
        MATERIAL: beräknaMaterialKostnad(STANDARD_INSTALLATION.MATERIAL, MATERIAL_PRISER)
    },
    UTBYTE: {
        ARBETSKOSTNAD: (UTBYTES_INSTALLATION.TIMMAR * MATERIAL_PRISER.KOSTNAD_TIM) + MATERIAL_PRISER.BILKOSTNAD,
        MATERIAL: beräknaMaterialKostnad(UTBYTES_INSTALLATION.MATERIAL, MATERIAL_PRISER)
    }
};

export const INSTALLATIONS_MATERIAL = {
    RÖRMATERIAL: {
        kopparrör: {
            artikelnummer: 'KOP-RÖR',
            namn: 'Kopparrör standard',
            inköpspris: 100,
            påslag: 1.42,
            försäljningspris: 170,
            lagerantal: 100,
            minLager: 20,
            enhet: 'meter'
        },
        isolering: {
            artikelnummer: 'ISO-STD',
            namn: 'Rörisolering standard',
            inköpspris: 50,
            påslag: 1.42,
            försäljningspris: 85,
            lagerantal: 150,
            minLager: 30,
            enhet: 'meter'
        }
    }
};
