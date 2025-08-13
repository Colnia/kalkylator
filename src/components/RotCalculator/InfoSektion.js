import React from 'react';
import { PUMP_TYPER, ROT_PROCENT, MAX_ROT } from './utils/constants';

export const InfoSektion = ({ pumpTyp }) => {
    const currentPump = Object.values(PUMP_TYPER).find(pump => pump.id === pumpTyp);
    const arbetsandel = currentPump ? currentPump.arbetsandel * 100 : 30;

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium mb-4">Viktig Information</h2>
            
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                    <ul className="space-y-3">
                        <li className="flex items-center text-gray-700">
                            <span className="text-blue-500 mr-2">•</span>
                            ROT-avdraget är {ROT_PROCENT * 100}% av arbetskostnaden
                        </li>
                        
                        <li className="flex items-center text-gray-700">
                            <span className="text-blue-500 mr-2">•</span>
                            Maxbelopp för ROT-avdrag är {MAX_ROT.toLocaleString()} kr per person och år
                        </li>
                        
                        <li className="flex items-center text-gray-700">
                            <span className="text-blue-500 mr-2">•</span>
                            Momssatsen är 25% på både arbete och material
                        </li>
                        
                        <li className="flex items-center text-gray-700">
                            <span className="text-blue-500 mr-2">•</span>
                            Arbetsandelen är {arbetsandel}% för denna installation
                        </li>
                    </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Tips</h3>
                    <p className="text-sm text-blue-700">
                        Välj beräkningsmetod baserat på vilket pris du har tillgängligt. 
                        Kalkylatorn räknar automatiskt ut alla relevanta belopp oavsett vilken metod du väljer.
                    </p>
                </div>
            </div>
        </div>
    );
};
