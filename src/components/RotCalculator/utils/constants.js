export const MOMS = 1.25;
export const ROT_PROCENT = 0.3;
export const MAX_ROT = 50000;

export const PUMP_TYPER = {
    LUFT_LUFT: {
        id: 'luft-luft',
        namn: 'Luft/luft värmepump',
        arbetsandel: 0.30
    },
    LUFT_VATTEN: {
        id: 'luft-vatten',
        namn: 'Luft/vatten värmepump',
        arbetsandel: 0.30
    },
    BERGVARME: {
        id: 'bergvarme',
        namn: 'Bergvärme',
        arbetsandel: 0.35
    }
};

export const BERAKNINGS_METODER = {
    EFTER_ROT: {
        id: 'efter-rot',
        namn: 'Pris till kund efter ROT',
        placeholder: 'Ange pris efter ROT'
    },
    EXKL_MOMS: {
        id: 'exkl-moms',
        namn: 'Pris till kund exkl. moms',
        placeholder: 'Ange pris exkl. moms'
    },
    INKL_MOMS: {
        id: 'inkl-moms',
        namn: 'Pris till kund inkl. moms före ROT',
        placeholder: 'Ange pris inkl. moms'
    }
}; 