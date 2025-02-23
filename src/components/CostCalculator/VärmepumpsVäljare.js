import React from 'react';
import { VARMEPUMPAR } from '../../constants/priser';
import { MOMS } from '../../constants/kostnader';

export const VärmepumpsVäljare = ({ state, updateState }) => {
    const formatPrice = (price, isCompany = false) => {
        return `${Math.round(price).toLocaleString()} kr${isCompany ? ' exkl. moms' : ''}`;
    };

    const handleVärmepumpVal = (pump) => {
        const pris = state.kundTyp === 'privat' 
            ? pump.kampanj 
            : pump.ordinarie / (1 + MOMS);
        
        updateState('värmepump', {
            namn: pump.model,
            pris: pris,
            effekt: pump.effekt,
            bruttopris: pump.bruttopris,
            installationspris: pump.installationspris
        });

        // Uppdatera även installationspris när värmepump väljs
        updateState('installationsPris', pump.installationspris);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(VARMEPUMPAR).map(([serie, modeller]) => (
                    <div key={serie} className="border rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-4">{serie}</h3>
                        <div className="space-y-4">
                            {Object.entries(modeller).map(([modellKod, pump]) => (
                                <div 
                                    key={modellKod}
                                    onClick={() => handleVärmepumpVal(pump)}
                                    className={`p-4 border rounded cursor-pointer transition-colors
                                        ${state.värmepump?.namn === pump.model 
                                            ? 'border-blue-500 bg-blue-50' 
                                            : 'hover:bg-gray-50'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium">{pump.model}</h4>
                                            <p className="text-sm text-gray-600">{pump.effekt}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">
                                                {state.kundTyp === 'privat' 
                                                    ? formatPrice(pump.kampanj)
                                                    : formatPrice(pump.ordinarie / (1 + MOMS), true)
                                                }
                                            </p>
                                            {state.kundTyp === 'privat' && pump.ordinarie !== pump.kampanj && (
                                                <p className="text-sm text-gray-500 line-through">
                                                    {formatPrice(pump.ordinarie)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 