import React from 'react';
import { BaseSummering } from './BaseSummering';
import { 
    FRAMKÖRNING_KOSTNAD,
    CERTIFIERING_KOSTNAD,
    PROVTRYCKNING_KOSTNAD,
    SVETS_MATERIAL_KOSTNAD,
    MOMS,
    ROT_PROCENT,
    MAX_ROT,
    PÅSLAG
} from '../../constants/kostnader';
import { formatPrice } from '../../utils/utils';
import { TIMPRIS } from '../../constants/pricing';

export const ReparationSummering = ({ state }) => {
    const beräknaKostnader = () => {
        let kostnader = {
            materialkostnadExklMoms: 0,
            arbetskostnadExklMoms: 0,
            framkörningKostnad: 0,
            certifieringKostnad: CERTIFIERING_KOSTNAD,
            provtryckningKostnad: 0,
            svetsMaterialKostnad: 0,
            totalMaterialKostnad: 0,
            totalArbetskostnad: 0,
            rotAvdrag: 0,
            totalExklMoms: 0,
            momsBelopp: 0,
            totalInklMoms: 0,
            total: 0
        };

        // Beräkna arbetskostnader
        const arbetskostnad = state.timmar * TIMPRIS;
        kostnader.arbetskostnadExklMoms = arbetskostnad;
        kostnader.framkörningKostnad = FRAMKÖRNING_KOSTNAD;

        // Beräkna materialkostnader
        if (state.material?.length > 0) {
            kostnader.materialkostnadExklMoms = state.material.reduce((total, item) => 
                total + (item.pris * item.antal * PÅSLAG), 0);
        }

        if (state.provtryckning) {
            kostnader.provtryckningKostnad = state.köldmediaMängd > 3 
                ? PROVTRYCKNING_KOSTNAD.OVER_3KG 
                : PROVTRYCKNING_KOSTNAD.UNDER_3KG;
        }

        if (state.svetsMaterial) {
            kostnader.svetsMaterialKostnad = SVETS_MATERIAL_KOSTNAD;
        }

        // Beräkna totaler
        kostnader.totalMaterialKostnad = 
            kostnader.materialkostnadExklMoms + 
            kostnader.provtryckningKostnad +
            kostnader.svetsMaterialKostnad;

        kostnader.totalArbetskostnad = 
            kostnader.arbetskostnadExklMoms + 
            kostnader.framkörningKostnad +
            kostnader.certifieringKostnad;

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

        return kostnader;
    };

    const extraKomponenter = {
        arbetskostnader: (
            <>
                <div className="flex justify-between">
                    <span>Arbete:</span>
                    <span>{formatPrice(state.timmar * TIMPRIS)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Framkörning:</span>
                    <span>{formatPrice(FRAMKÖRNING_KOSTNAD)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Certifieringsavgift:</span>
                    <span>{formatPrice(CERTIFIERING_KOSTNAD)}</span>
                </div>
            </>
        ),
        materialkostnader: (
            <>
                {state.material?.map((item, index) => (
                    <div key={index} className="flex justify-between">
                        <span>{item.namn}:</span>
                        <span>{formatPrice(item.pris * item.antal * PÅSLAG)}</span>
                    </div>
                ))}
                {state.provtryckning && (
                    <div className="flex justify-between">
                        <span>Provtryckning:</span>
                        <span>{formatPrice(state.köldmediaMängd > 3 
                            ? PROVTRYCKNING_KOSTNAD.OVER_3KG 
                            : PROVTRYCKNING_KOSTNAD.UNDER_3KG)}
                        </span>
                    </div>
                )}
                {state.svetsMaterial && (
                    <div className="flex justify-between">
                        <span>Svetsmaterial:</span>
                        <span>{formatPrice(SVETS_MATERIAL_KOSTNAD)}</span>
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