import { MOMS, ROT_PROCENT, MAX_ROT, PUMP_TYPER } from './constants';

export const beraknaResultat = (formData) => {
    const { pumpTyp, berakningsMetod, pris } = formData;
    const inputPris = parseFloat(pris);
    
    // Hämta arbetsandel för vald pump
    const pump = Object.values(PUMP_TYPER).find(p => p.id === pumpTyp);
    const arbetsandel = pump ? pump.arbetsandel : 0.30;

    // Beräkna totala kostnader baserat på vald metod
    let totalInklMoms;
    switch (berakningsMetod) {
        case 'efter-rot':
            // Om priset är efter ROT, räkna baklänges
            const rotFaktor = arbetsandel * ROT_PROCENT;
            totalInklMoms = inputPris / (1 - rotFaktor);
            break;
            
        case 'exkl-moms':
            // Om priset är exkl moms, lägg på moms
            totalInklMoms = inputPris * MOMS;
            break;
            
        case 'inkl-moms':
            // Om priset är inkl moms, använd direkt
            totalInklMoms = inputPris;
            break;
            
        default:
            throw new Error('Ogiltig beräkningsmetod');
    }

    // Grundläggande beräkningar
    const totalExklMoms = totalInklMoms / MOMS;
    
    // Arbetskostnader
    const arbetskostnadInklMoms = totalInklMoms * arbetsandel;
    const arbetskostnadExklMoms = arbetskostnadInklMoms / MOMS;
    
    // Materialkostnader
    const materialkostnadInklMoms = totalInklMoms * (1 - arbetsandel);
    const materialkostnadExklMoms = materialkostnadInklMoms / MOMS;
    
    // ROT-avdrag
    const potentiellRotavdrag = arbetskostnadInklMoms * ROT_PROCENT;
    const rotavdrag = Math.min(potentiellRotavdrag, MAX_ROT);
    
    // Slutpris efter ROT
    const slutpris = totalInklMoms - rotavdrag;

    return {
        // Totala kostnader
        totalInklMoms,
        totalExklMoms,
        
        // Arbetskostnader
        arbetskostnadInklMoms,
        arbetskostnadExklMoms,
        
        // Materialkostnader
        materialkostnadInklMoms,
        materialkostnadExklMoms,
        
        // ROT och slutpris
        rotavdrag,
        slutpris,
        
        // Extra information
        arbetsandel,
        rotProcent: ROT_PROCENT,
        maxRot: MAX_ROT,
        momssats: MOMS - 1
    };
}; 