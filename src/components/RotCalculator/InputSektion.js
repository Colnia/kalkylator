import React from 'react';
import { PUMP_TYPER, BERAKNINGS_METODER } from './utils/constants';

export const InputSektion = ({ formData, onChange, onBerakna, error }) => {
    // Hitta rätt beräkningsmetod-objekt
    const currentMetod = Object.values(BERAKNINGS_METODER).find(
        metod => metod.id === formData.berakningsMetod
    );

    return (
        <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-yellow-800">
                    <strong>OBS!</strong> Detta är endast ett beräkningsverktyg. Kontrollera alltid med Skatteverkets regler för aktuella bestämmelser.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Välj typ av värmepump:
                    </label>
                    <select
                        value={formData.pumpTyp}
                        onChange={(e) => onChange('pumpTyp', e.target.value)}
                        className="w-full p-2 border rounded-md shadow-sm"
                    >
                        {Object.values(PUMP_TYPER).map(pump => (
                            <option key={pump.id} value={pump.id}>
                                {pump.namn} ({pump.arbetsandel * 100}% arbetskostnad)
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Välj beräkningsmetod:
                    </label>
                    <select
                        value={formData.berakningsMetod}
                        onChange={(e) => onChange('berakningsMetod', e.target.value)}
                        className="w-full p-2 border rounded-md shadow-sm"
                    >
                        {Object.values(BERAKNINGS_METODER).map(metod => (
                            <option key={metod.id} value={metod.id}>
                                {metod.namn}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ange pris:
                    </label>
                    <input
                        type="number"
                        value={formData.pris}
                        onChange={(e) => onChange('pris', e.target.value)}
                        placeholder={currentMetod ? currentMetod.placeholder : 'Ange pris'}
                        className={`w-full p-2 border rounded-md shadow-sm ${error ? 'border-red-500' : ''}`}
                        min="0"
                        step="1"
                    />
                    {error && (
                        <p className="mt-1 text-sm text-red-600">
                            {error}
                        </p>
                    )}
                </div>

                <button
                    onClick={onBerakna}
                    disabled={!formData.pris || error}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed mt-4"
                >
                    Beräkna
                </button>
            </div>
        </div>
    );
}; 