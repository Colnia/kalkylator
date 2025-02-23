import React from 'react';
import { MATERIAL_PRISER } from '../../constants/installationspriser';
import { INSTALLATION_TYPER, VÄGG_TYPER, PLACERINGAR } from '../../constants/installation';

export const ExtraSektion = ({ state, updateState }) => {
    const handleExtraMaterial = (checked) => {
        updateState('visaMaterial', checked);
        if (!checked) {
            updateState('material', []);
        }
    };

    const handleExtraRörlängd = (value) => {
        updateState('extraRörlängd', value);
    };

    return (
        <div className="space-y-6">
            {state.installationsTyp === 'komplex' && (
                <div className="space-y-4">
                    <h4 className="font-medium">Komplex installation</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Antal arbetstimmar
                            </label>
                            <input
                                type="number"
                                value={state.extraTimmar || ''}
                                onChange={e => updateState('extraTimmar', parseInt(e.target.value) || 0)}
                                className="w-full p-2 border rounded-md shadow-sm"
                                min="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Extra rörlängd (meter)
                            </label>
                            <input
                                type="number"
                                value={state.extraRörlängd || ''}
                                onChange={e => handleExtraRörlängd(parseInt(e.target.value) || 0)}
                                className="w-full p-2 border rounded-md shadow-sm"
                                min="0"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                558 kr/meter {state.kundTyp === 'privat' ? 'inkl.' : 'exkl.'} moms
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Väggtyp
                            </label>
                            <select
                                value={state.väggtyp}
                                onChange={e => updateState('väggtyp', e.target.value)}
                                className="w-full p-2 border rounded-md shadow-sm"
                            >
                                <option value="">Välj väggtyp</option>
                                <option value={VÄGG_TYPER.TRÄ}>Trävägg</option>
                                <option value={VÄGG_TYPER.TEGEL}>Tegelvägg</option>
                                <option value={VÄGG_TYPER.BETONG}>Betongvägg</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Placering av utomhusenhet
                            </label>
                            <select
                                value={state.utomhusenhetPlacering}
                                onChange={e => updateState('utomhusenhetPlacering', e.target.value)}
                                className="w-full p-2 border rounded-md shadow-sm"
                            >
                                <option value="">Välj placering</option>
                                <option value={PLACERINGAR.MARK}>Markplacering</option>
                                <option value={PLACERINGAR.VÄGG}>Väggmontage</option>
                                <option value={PLACERINGAR.BALKONG}>Balkong</option>
                                <option value={PLACERINGAR.TAK}>Tak</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Extra material sektion */}
            <div>
                <label className="flex items-center space-x-2 mb-4">
                    <input
                        type="checkbox"
                        checked={state.visaMaterial}
                        onChange={(e) => handleExtraMaterial(e.target.checked)}
                        className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>Lägg till extra material</span>
                </label>

                {state.visaMaterial && (
                    <div className="space-y-4 mt-4">
                        <h4 className="font-medium">Extra material</h4>
                        {state.material.map((item, index) => (
                            <div key={index} className="grid grid-cols-3 gap-2">
                                <input
                                    type="text"
                                    value={item.namn}
                                    onChange={e => updateState('material', state.material.map((m, i) => 
                                        i === index ? { ...m, namn: e.target.value } : m
                                    ))}
                                    placeholder="Beskrivning"
                                    className="p-2 border rounded"
                                />
                                <input
                                    type="number"
                                    value={item.antal}
                                    onChange={e => updateState('material', state.material.map((m, i) => 
                                        i === index ? { ...m, antal: Number(e.target.value) } : m
                                    ))}
                                    placeholder="Antal"
                                    className="p-2 border rounded"
                                />
                                <input
                                    type="number"
                                    value={item.pris}
                                    onChange={e => updateState('material', state.material.map((m, i) => 
                                        i === index ? { ...m, pris: Number(e.target.value) } : m
                                    ))}
                                    placeholder="Pris"
                                    className="p-2 border rounded"
                                />
                            </div>
                        ))}
                        <button
                            onClick={() => updateState('material', [...state.material, { namn: '', antal: 0, pris: 0 }])}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Lägg till material
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}; 