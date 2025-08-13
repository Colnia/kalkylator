import React from 'react';

export const ReparationSektion = ({ state, updateState }) => {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Reparationsdetaljer</h3>
            
            {/* Anläggningsinformation */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Anläggning
                </label>
                <input
                    type="text"
                    value={state.anläggning}
                    onChange={e => updateState('anläggning', e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>

            {/* Beskrivning */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beskrivning av felet
                </label>
                <textarea
                    value={state.beskrivning}
                    onChange={e => updateState('beskrivning', e.target.value)}
                    className="w-full p-2 border rounded-md"
                    rows="3"
                />
            </div>

            {/* Arbetstid */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Antal timmar
                </label>
                <input
                    type="number"
                    value={state.timmar}
                    onChange={e => updateState('timmar', Number(e.target.value))}
                    className="w-full p-2 border rounded-md"
                    min="0"
                    step="0.5"
                />
            </div>

            {/* Köldmediamängd */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Köldmediamängd (kg)
                </label>
                <input
                    type="number"
                    value={state.köldmediaMängd}
                    onChange={e => updateState('köldmediaMängd', Number(e.target.value))}
                    className="w-full p-2 border rounded-md"
                    min="0"
                    step="0.1"
                />
            </div>

            {/* Övriga inställningar */}
            <div className="space-y-2">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={state.provtryckning}
                        onChange={e => updateState('provtryckning', e.target.checked)}
                        className="mr-2"
                    />
                    <label>Provtryckning krävs</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={state.svetsMaterial}
                        onChange={e => updateState('svetsMaterial', e.target.checked)}
                        className="mr-2"
                    />
                    <label>Svetsmaterial behövs</label>
                </div>
            </div>

            {/* Teknikernoteringar */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teknikernoteringar
                </label>
                <textarea
                    value={state.teknikerNoteringar}
                    onChange={e => updateState('teknikerNoteringar', e.target.value)}
                    className="w-full p-2 border rounded-md"
                    rows="3"
                />
            </div>
        </div>
    );
};
