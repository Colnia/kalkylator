// Värmepumpar grupperade efter serie
export const VARMEPUMPAR = {
    'SUMO': {
        'RW25': {
            model: 'RW25 SUMO',
            effekt: '2.5 kW',
            bruttopris: 32300,
            ordinarie: 24900,
            kampanj: 19900,
            installationspris: 29180
        },
        'RW35': {
            model: 'RW35 SUMO',
            effekt: '3.5 kW',
            bruttopris: 34800,
            ordinarie: 27900,
            kampanj: 22900,
            installationspris: 30780
        },
        'RW50': {
            model: 'RW50 SUMO',
            effekt: '5.0 kW',
            bruttopris: 40800,
            ordinarie: 32900,
            kampanj: 27900,
            installationspris: 34299
        }
    },
    'HERO': {
        'LN25': {
            model: 'LN25 HERO',
            effekt: '2.5 kW',
            bruttopris: 29850,
            rabattPåslag: 63.0,
            inköpspris: 11044.50,
            ordinarie: 20988.28,
            kampanj: 19488,
            installationspris: 27612
        },
        'LN35': {
            model: 'LN35 HERO',
            effekt: '3.5 kW',
            bruttopris: 32150,
            rabattPåslag: 59.5,
            inköpspris: 13006.75,
            ordinarie: 22605.47,
            kampanj: 21105,
            installationspris: 29084
        },
        'LN50': {
            model: 'LN50 HERO',
            effekt: '5.0 kW',
            bruttopris: 37450,
            rabattPåslag: 59.5,
            inköpspris: 15167.25,
            ordinarie: 26332.03,
            kampanj: 24832,
            installationspris: 32475
        }
    },
    'DESIGN': {
        'EF25': {
            model: 'EF25 DESIGN',
            effekt: '2.5 kW',
            bruttopris: 21400,
            rabattPåslag: 59.5,
            inköpspris: 8667,
            ordinarie: 15046.88,
            kampanj: 15047,
            installationspris: 23571
        },
        'EF35': {
            model: 'EF35 DESIGN',
            effekt: '3.5 kW',
            bruttopris: 24500,
            rabattPåslag: 59.5,
            inköpspris: 9922.50,
            ordinarie: 17226.56,
            kampanj: 17227,
            installationspris: 25554
        }
    },
    'NINJA': {
        'FT25': {
            model: 'FT25 NINJA',
            effekt: '2.5 kW',
            bruttopris: 26400,
            ordinarie: 19900,
            kampanj: 16900,
            installationspris: 26770
        },
        'FT35': {
            model: 'FT35 NINJA',
            effekt: '3.5 kW',
            bruttopris: 28200,
            ordinarie: 22900,
            kampanj: 18320,
            installationspris: 27912
        },
        'FT50': {
            model: 'FT50 NINJA',
            effekt: '5.0 kW',
            bruttopris: 33200,
            ordinarie: 24900,
            kampanj: 19900,
            installationspris: 31121
        }
    },
    'DOJO': {
        'KW25': {
            model: 'KW25 Dojo',
            effekt: '2.5 kW',
            bruttopris: 27750,
            rabattPåslag: 59.5,
            inköpspris: 11238.75,
            ordinarie: 19511.72,
            kampanj: 19512,
            installationspris: 27634
        },
        'KW35': {
            model: 'KW35 Dojo',
            effekt: '3.5 kW',
            bruttopris: 29600,
            rabattPåslag: 59.5,
            inköpspris: 11988,
            ordinarie: 20812.50,
            kampanj: 20813,
            installationspris: 28817
        }
    },
    'AY': {
        'AY25': {
            model: 'AY25',
            effekt: '2.5 kW',
            bruttopris: 22450,
            rabattPåslag: 59.5,
            inköpspris: 9092.25,
            ordinarie: 15785.16,
            kampanj: 15785,
            installationspris: 24243
        },
        'AY50': {
            model: 'AY50',
            effekt: '5.0 kW',
            bruttopris: 31700,
            rabattPåslag: 59.5,
            inköpspris: 12838.50,
            ordinarie: 22289.06,
            kampanj: 22289,
            installationspris: 30161
        }
    }
};

// Installationsmaterial
export const INSTALLATIONS_MATERIAL = {
    KONSOL: {
        standard: {
            artikelnummer: 'KON-STD',
            namn: 'Standardkonsol',
            inköpspris: 800,
            påslag: 1.42,
            försäljningspris: 1200,
            lagerantal: 25,
            minLager: 5,
            enhet: 'st'
        },
        heavy: {
            artikelnummer: 'KON-HVY',
            namn: 'Förstärkt konsol',
            inköpspris: 1200,
            påslag: 1.42,
            försäljningspris: 1800,
            lagerantal: 15,
            minLager: 3,
            enhet: 'st'
        }
    },
    RÖRMATERIAL: {
        kopparrör: {
            artikelnummer: 'RÖR-CU-6',
            namn: 'Kopparrör 6mm',
            inköpspris: 200,
            påslag: 1.42,
            försäljningspris: 350,
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
    },
    ÖVRIGT: {
        värmekabel: {
            artikelnummer: 'VÄRM-KAB',
            namn: 'Värmekabel för dränering',
            inköpspris: 500,
            påslag: 1.42,
            försäljningspris: 800,
            lagerantal: 20,
            minLager: 5,
            enhet: 'st'
        },
        kondensvattenslang: {
            artikelnummer: 'KON-SLG',
            namn: 'Kondensvattenslang',
            inköpspris: 100,
            påslag: 1.42,
            försäljningspris: 180,
            lagerantal: 50,
            minLager: 10,
            enhet: 'meter'
        }
    }
};

// Arbetskostnader
export const ARBETSKOSTNADER = {
    INSTALLATION: {
        STANDARD: {
            namn: 'Standardinstallation',
            timpris: 750,
            beräknadTid: 4,
            totalpris: 4500,
            rotberättigad: true
        },
        KOMPLEX: {
            namn: 'Komplex installation',
            timpris: 750,
            beräknadTid: 6,
            totalpris: 6500,
            rotberättigad: true
        }
    },
    TILLÄGG: {
        FRAMKÖRNING: {
            namn: 'Framkörning',
            pris: 750,
            rotberättigad: true
        },
        CERTIFIERING: {
            namn: 'Certifieringsavgift',
            pris: 500,
            rotberättigad: false
        }
    }
};

// Väggtyper och tillägg
export const VÄGG_TILLÄGG = {
    TRÄ: {
        namn: 'Trävägg',
        timpris: 0,
        materialpris: 0
    },
    TEGEL: {
        namn: 'Tegelvägg',
        timpris: 750,
        materialpris: 500
    },
    BETONG: {
        namn: 'Betongvägg',
        timpris: 1500,
        materialpris: 800
    }
};

// Placeringstillägg
export const PLACERING_TILLÄGG = {
    MARK: {
        namn: 'Markplacering',
        timpris: 750,
        materialpris: 1200
    },
    VÄGG: {
        namn: 'Väggmontage',
        timpris: 0,
        materialpris: 0
    },
    BALKONG: {
        namn: 'Balkongmontage',
        timpris: 750,
        materialpris: 800
    },
    TAK: {
        namn: 'Takmontage',
        timpris: 1500,
        materialpris: 1500
    }
};

// Generella inställningar
export const GENERELLA_INSTÄLLNINGAR = {
    STANDARD_PÅSLAG: 1.42,
    MOMS: 0.25,
    ROT: {
        PROCENT: 0.30,
        MAX_BELOPP: 50000
    },
    PROVTRYCKNING: {
        UNDER_3KG: {
            pris: 1500,
            rotberättigad: true
        },
        ÖVER_3KG: {
            pris: 2500,
            rotberättigad: true
        }
    },
    SVETSMATERIAL: {
        pris: 750,
        rotberättigad: false
    }
};

export const KALKYLATOR_TYPER = {
    LUFT_LUFT: 'luft-luft',
    LUFT_VATTEN: 'luft-vatten',
    BERGVÄRME: 'bergvärme',
    REPARATION: 'reparation'
};
