import React from 'react';
import { TIMPRIS, KÖLDMEDIA_TYPER, KALKYLATOR_TYPER } from '../../constants/pricing';
import { INSTALLATION_TYPER } from '../../constants/installation';
import { saveCalculation } from '../../utils/storage';
import { generatePDF } from '../../utils/pdf';
import { MATERIAL_PRISER, STANDARD_INSTALLATION, INSTALLATIONS_MATERIAL } from '../../constants/installationspriser';
import { 
    PROVTRYCKNING_KOSTNAD, 
    SVETS_MATERIAL_KOSTNAD,
    FRAMKÖRNING_KOSTNAD,
    CERTIFIERING_KOSTNAD,
    INSTALLATION_PRISER,
    VÄGG_TILLÄGG,
    PLACERING_TILLÄGG,
    EXTRA_MATERIAL_PRISER,
    ROT_PROCENT,
    MAX_ROT,
    MOMS,
    PÅSLAG
} from '../../constants/kostnader';
import { formatPrice } from '../../utils/utils';

export const Summering = ({ state }) => {
    const beräknaMaterialKostnad = (material, priser) => {
        return Object.entries(material).reduce((total, [key, antal]) => {
            return total + (priser[key] * antal);
        }, 0);
    };

    const beraknaTotal = () => {
        console.log('Full state:', state);
        console.log('Kalkylator typ:', state.kalkylatorsTyp);
        console.log('Kundtyp:', state.kundTyp);

        let totalKostnad = {
            total: 0,
            arbetskostnadExklMoms: 0,
            materialkostnadExklMoms: 0,
            köldmediaKostnad: 0,
            framkörningKostnad: 0,
            certifieringKostnad: CERTIFIERING_KOSTNAD,
            totalMaterialKostnad: 0,
            totalArbetskostnad: 0,
            rotAvdrag: 0,
            momsBelopp: 0,
            totalExklMoms: 0,
            totalInklMoms: 0
        };

        if (state.kalkylatorsTyp === KALKYLATOR_TYPER.REPARATION) {
            // Beräkna framkörningar och tid
            if (state.tidigareFelsökning) {
                totalKostnad.framkörningAntal += 1;
            }
            
            if (state.uppföljandeläcksökning) {
                totalKostnad.framkörningAntal += 1;
                totalKostnad.uppföljandeTid = 1; // En timme för uppföljande läcksökning
            }

            // Beräkna total framkörningskostnad
            totalKostnad.framkörningKostnad = totalKostnad.framkörningAntal * FRAMKÖRNING_KOSTNAD;

            // Beräkna total arbetskostnad inklusive uppföljande tid
            const arbetskostnad = (state.timmar + totalKostnad.uppföljandeTid) * TIMPRIS;
            totalKostnad.arbetskostnadExklMoms = arbetskostnad;

            // Beräkna provtryckningskostnad baserat på köldmediamängd
            if (state.provtryckning) {
                totalKostnad.provtryckningKostnad = 
                    state.köldmediaMängd > 3 
                        ? PROVTRYCKNING_KOSTNAD.OVER_3KG 
                        : PROVTRYCKNING_KOSTNAD.UNDER_3KG;
            }

            // Lägg till svetsmaterialkostnad om det behövs
            if (state.svetsMaterial) {
                totalKostnad.svetsMaterialKostnad = SVETS_MATERIAL_KOSTNAD;
            }

            // Beräkna materialkostnader
            const materialkostnad = state.material?.reduce((total, item) => 
                total + (item.pris * item.antal * PÅSLAG), 0) || 0;

            // Samla alla materialkostnader
            totalKostnad.totalMaterialKostnad = 
                materialkostnad + 
                totalKostnad.köldmediaKostnad +
                (state.provtryckning ? totalKostnad.provtryckningKostnad : 0) +
                (state.svetsMaterial ? totalKostnad.svetsMaterialKostnad : 0);

            // Samla alla arbetskostnader
            totalKostnad.totalArbetskostnad = 
                totalKostnad.arbetskostnadExklMoms + 
                totalKostnad.framkörningKostnad +
                totalKostnad.certifieringKostnad;

            // Beräkna total exkl. moms
            totalKostnad.totalExklMoms = 
                totalKostnad.totalMaterialKostnad + 
                totalKostnad.totalArbetskostnad;

            // Beräkna moms
            totalKostnad.momsBelopp = totalKostnad.totalExklMoms * MOMS;

            // Beräkna total inkl. moms
            totalKostnad.totalInklMoms = totalKostnad.totalExklMoms + totalKostnad.momsBelopp;

            // Beräkna ROT-avdrag om kunden är privatperson
            if (state.kundTyp === 'privat') {
                // ROT-avdrag gäller endast på arbetskostnad
                totalKostnad.rotAvdrag = Math.min(
                    totalKostnad.arbetskostnadExklMoms * ROT_PROCENT,
                    MAX_ROT
                );
            }

            // Beräkna slutlig total
            totalKostnad.total = totalKostnad.totalInklMoms - totalKostnad.rotAvdrag;
        }

        if (state.kalkylatorsTyp === KALKYLATOR_TYPER.LUFT_LUFT) {
            // Värmepumpspris
            if (state.värmepump) {
                console.log('Vald värmepump:', state.värmepump);
                console.log('STANDARD_INSTALLATION:', STANDARD_INSTALLATION);
                console.log('MATERIAL_PRISER:', MATERIAL_PRISER);
                
                // Materialkostnad (värmepump)
                const pumpPris = state.kundTyp === 'privat' 
                    ? state.värmepump.kampanj
                    : state.värmepump.ordinarie;
                
                console.log('Valt pumppris:', pumpPris);
                totalKostnad.materialkostnadExklMoms = pumpPris / (1 + MOMS);
                console.log('Materialkostnad exkl moms:', totalKostnad.materialkostnadExklMoms);

                // Arbetskostnad (installation)
                if (state.kundTyp === 'privat') {
                    // Standardinstallation för privatpersoner
                    const installationsPris = STANDARD_INSTALLATION.TIMMAR * MATERIAL_PRISER.KOSTNAD_TIM;
                    console.log('Installationstimmar:', STANDARD_INSTALLATION.TIMMAR);
                    console.log('Timpris:', MATERIAL_PRISER.KOSTNAD_TIM);
                    console.log('Beräknat installationspris:', installationsPris);
                    
                    totalKostnad.arbetskostnadExklMoms = installationsPris;
                    
                    // Lägg till materialkostnad för standardinstallation
                    const standardMaterialKostnad = beräknaMaterialKostnad(
                        STANDARD_INSTALLATION.MATERIAL, 
                        MATERIAL_PRISER
                    );
                    console.log('Standard material:', STANDARD_INSTALLATION.MATERIAL);
                    console.log('Beräknad materialkostnad:', standardMaterialKostnad);
                    
                    totalKostnad.materialkostnadExklMoms += standardMaterialKostnad;
                } else {
                    totalKostnad.arbetskostnadExklMoms = state.värmepump.installationspris / (1 + MOMS);
                }

                // Logga totala kostnader
                console.log('Total materialkostnad:', totalKostnad.materialkostnadExklMoms);
                console.log('Total arbetskostnad:', totalKostnad.arbetskostnadExklMoms);
            }

            // Samla totala kostnader
            totalKostnad.totalMaterialKostnad = totalKostnad.materialkostnadExklMoms;
            totalKostnad.totalArbetskostnad = totalKostnad.arbetskostnadExklMoms + totalKostnad.certifieringKostnad;

            console.log('Slutliga totaler:', {
                material: totalKostnad.totalMaterialKostnad,
                arbete: totalKostnad.totalArbetskostnad,
                exklMoms: totalKostnad.totalExklMoms,
                moms: totalKostnad.momsBelopp,
                total: totalKostnad.total
            });
        }

        return totalKostnad;
    };

    const {
        total,
        arbetskostnadExklMoms,
        materialkostnadExklMoms,
        köldmediaKostnad,
        framkörningKostnad,
        certifieringKostnad,
        provtryckningKostnad,
        svetsMaterialKostnad,
        totalMaterialKostnad,
        totalArbetskostnad,
        extraKostnader,
        rotAvdrag,
        totalExklMoms,
        momsBelopp,
        totalInklMoms
    } = beraknaTotal();

    const handleSave = () => {
        const calculation = {
            ...state,
            totalExklMoms,
            momsBelopp,
            totalInklMoms,
            rotAvdrag,
            slutpris: total
        };
        saveCalculation(calculation);
        alert('Beräkningen har sparats!');
    };

    return (
        <div className="space-y-2 border-t pt-4">
            <h3 className="font-medium">Summering</h3>
            <div className="space-y-1">
                {/* Arbetskostnader */}
                <div className="mb-2">
                    <div className="font-medium">Arbetskostnader</div>
                    <div className="pl-4">
                        <div className="flex justify-between">
                            <span>Arbete:</span>
                            <span>{arbetskostnadExklMoms.toFixed(2)} kr</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Framkörning:</span>
                            <span>{framkörningKostnad.toFixed(2)} kr</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Certifieringsavgift:</span>
                            <span>{certifieringKostnad.toFixed(2)} kr</span>
                        </div>
                        <div className="flex justify-between font-medium border-t mt-1 pt-1">
                            <span>Total arbetskostnad:</span>
                            <span>{totalArbetskostnad.toFixed(2)} kr</span>
                        </div>
                    </div>
                </div>

                {/* Materialkostnader */}
                {totalMaterialKostnad > 0 && (
                    <div className="mb-2">
                        <div className="font-medium">Materialkostnader</div>
                        <div className="pl-4">
                            {state.värmepump && (
                                <div className="flex justify-between">
                                    <span>Värmepump ({state.värmepump.model}):</span>
                                    <span>{state.kundTyp === 'privat' 
                                        ? formatPrice(state.värmepump.kampanj)
                                        : formatPrice(state.värmepump.ordinarie)
                                    }</span>
                                </div>
                            )}
                            {state.material?.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                    <span>{item.namn}:</span>
                                    <span>{(item.pris * item.antal * PÅSLAG).toFixed(2)} kr</span>
                                </div>
                            ))}
                            {köldmediaKostnad > 0 && (
                                <div className="flex justify-between">
                                    <span>Köldmedia:</span>
                                    <span>{köldmediaKostnad.toFixed(2)} kr</span>
                                </div>
                            )}
                            {provtryckningKostnad > 0 && (
                                <div className="flex justify-between">
                                    <span>Provtryckning:</span>
                                    <span>{provtryckningKostnad.toFixed(2)} kr</span>
                                </div>
                            )}
                            {svetsMaterialKostnad > 0 && (
                                <div className="flex justify-between">
                                    <span>Svetsmaterial:</span>
                                    <span>{svetsMaterialKostnad.toFixed(2)} kr</span>
                                </div>
                            )}
                            <div className="flex justify-between font-medium border-t mt-1 pt-1">
                                <span>Total materialkostnad:</span>
                                <span>{totalMaterialKostnad.toFixed(2)} kr</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Summering */}
                <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                        <span>Totalt exkl. moms:</span>
                        <span>{formatPrice(totalExklMoms)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Moms (25%):</span>
                        <span>{formatPrice(momsBelopp)}</span>
                    </div>
                    {state.kundTyp === 'privat' && rotAvdrag > 0 && (
                        <div className="flex justify-between text-green-600">
                            <span>ROT-avdrag:</span>
                            <span>-{formatPrice(rotAvdrag)}</span>
                        </div>
                    )}
                    <div className="flex justify-between font-medium">
                        <span>Totalt att betala{state.kundTyp === 'privat' ? ' (inkl. moms)' : ''}:</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mt-4">
                <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Spara beräkning
                </button>
                <button 
                    onClick={() => generatePDF({ 
                        ...state, 
                        totalExklMoms, 
                        momsBelopp, 
                        totalInklMoms,
                        rotAvdrag,
                        slutpris: total
                    })}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Skapa PDF
                </button>
            </div>
        </div>
    );
};