import React from 'react';
import { formatPrice } from '../../utils/utils';
import { generatePDF } from '../../utils/pdf';
import { saveCalculation } from '../../utils/storage';

export const BaseSummering = ({ 
    state, 
    kostnader, 
    visaMaterialKostnader = true,
    extraKomponenter = null 
}) => {
    const {
        total,
        arbetskostnadExklMoms,
        materialkostnadExklMoms,
        totalMaterialKostnad,
        totalArbetskostnad,
        rotAvdrag,
        totalExklMoms,
        momsBelopp,
        totalInklMoms
    } = kostnader;

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
            
            {/* Arbetskostnader */}
            <div className="mb-2">
                <div className="font-medium">Arbetskostnader</div>
                <div className="pl-4">
                    {extraKomponenter?.arbetskostnader}
                    <div className="flex justify-between font-medium border-t mt-1 pt-1">
                        <span>Total arbetskostnad:</span>
                        <span>{formatPrice(totalArbetskostnad)}</span>
                    </div>
                </div>
            </div>

            {/* Materialkostnader */}
            {visaMaterialKostnader && totalMaterialKostnad > 0 && (
                <div className="mb-2">
                    <div className="font-medium">Materialkostnader</div>
                    <div className="pl-4">
                        {extraKomponenter?.materialkostnader}
                        <div className="flex justify-between font-medium border-t mt-1 pt-1">
                            <span>Total materialkostnad:</span>
                            <span>{formatPrice(totalMaterialKostnad)}</span>
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

            {/* Knappar */}
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