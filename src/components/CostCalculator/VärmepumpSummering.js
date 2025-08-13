import React from 'react';
import { BaseSummering } from './BaseSummering';
import { MOMS, ROT_PROCENT, MAX_ROT } from '../../constants/kostnader';
import { STANDARD_INSTALLATION, MATERIAL_PRISER } from '../../constants/installationspriser';
import { formatPrice } from '../../utils/utils';

export const VärmepumpSummering = ({ state }) => {
    const beräknaKostnader = () => {
        let kostnader = {
            materialkostnadExklMoms: 0,
            arbetskostnadExklMoms: 0,
            totalMaterialKostnad: 0,
            totalArbetskostnad: 0,
            rotAvdrag: 0,
            totalExklMoms: 0,
            momsBelopp: 0,
            totalInklMoms: 0,
            total: 0
        };

        if (state.värmepump) {
            console.log('Beräknar kostnader för värmepump:', state.värmepump);
            
            // Värmepumpspris (inklusive moms för privat, exklusive för företag)
            const pumpPris = state.kundTyp === 'privat' 
                ? state.värmepump.kampanj
                : state.värmepump.ordinarie;
            
            console.log('Valt pumppris:', pumpPris);
            
            // För privatperson är priset inklusive moms, så vi måste räkna bakåt
            kostnader.materialkostnadExklMoms = state.kundTyp === 'privat'
                ? pumpPris / (1 + MOMS)
                : pumpPris;

            console.log('Materialkostnad exkl moms:', kostnader.materialkostnadExklMoms);

            // Installationskostnad
            if (state.kundTyp === 'privat') {
                // Standardinstallation för privatpersoner
                const installationsPris = STANDARD_INSTALLATION.TIMMAR * MATERIAL_PRISER.KOSTNAD_TIM;
                kostnader.arbetskostnadExklMoms = installationsPris;
                
                console.log('Installationstimmar:', STANDARD_INSTALLATION.TIMMAR);
                console.log('Timpris:', MATERIAL_PRISER.KOSTNAD_TIM);
                console.log('Beräknat installationspris:', installationsPris);
                
                // Lägg till materialkostnad för standardinstallation
                const standardMaterialKostnad = Object.entries(STANDARD_INSTALLATION.MATERIAL)
                    .reduce((total, [key, antal]) => {
                        const kostnad = MATERIAL_PRISER[key] * antal;
                        console.log(`Material ${key}:`, antal, 'st *', MATERIAL_PRISER[key], '=', kostnad);
                        return total + kostnad;
                    }, 0);
                
                console.log('Standard materialkostnad:', standardMaterialKostnad);
                kostnader.materialkostnadExklMoms += standardMaterialKostnad;
            } else {
                kostnader.arbetskostnadExklMoms = state.värmepump.installationspris / (1 + MOMS);
            }
        }

        // Beräkna totaler
        kostnader.totalMaterialKostnad = kostnader.materialkostnadExklMoms;
        kostnader.totalArbetskostnad = kostnader.arbetskostnadExklMoms;
        kostnader.totalExklMoms = kostnader.totalMaterialKostnad + kostnader.totalArbetskostnad;
        kostnader.momsBelopp = kostnader.totalExklMoms * MOMS;
        kostnader.totalInklMoms = kostnader.totalExklMoms + kostnader.momsBelopp;

        if (state.kundTyp === 'privat') {
            kostnader.rotAvdrag = Math.min(
                kostnader.totalArbetskostnad * ROT_PROCENT,
                MAX_ROT
            );
        }

        kostnader.total = kostnader.totalInklMoms - (kostnader.rotAvdrag || 0);

        console.log('Slutliga kostnader:', kostnader);

        return kostnader;
    };

    const extraKomponenter = {
        arbetskostnader: (
            <>
                <div className="flex justify-between">
                    <span>Installation:</span>
                    <span>{formatPrice(state.kundTyp === 'privat' 
                        ? STANDARD_INSTALLATION.TIMMAR * MATERIAL_PRISER.KOSTNAD_TIM * (1 + MOMS)
                        : state.värmepump?.installationspris || 0)}
                    </span>
                </div>
            </>
        ),
        materialkostnader: (
            <>
                {state.värmepump && (
                    <div className="flex justify-between">
                        <span>Värmepump ({state.värmepump.model}):</span>
                        <span>
                            {state.kundTyp === 'privat' 
                                ? formatPrice(state.värmepump.kampanj)
                                : formatPrice(state.värmepump.ordinarie)
                            }
                        </span>
                    </div>
                )}
            </>
        )
    };

    return (
        <BaseSummering 
            state={state}
            kostnader={beräknaKostnader()}
            extraKomponenter={extraKomponenter}
        />
    );
};
