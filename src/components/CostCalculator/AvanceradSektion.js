import React from 'react';
import { KÖLDMEDIA_TYPER } from '../../constants/pricing';

const PROVTRYCKNING_KOSTNAD = {
    UNDER_3KG: 322,
    OVER_3KG: 425
};

const SVETS_MATERIAL_KOSTNAD = 296;

export const AvanceradSektion = ({ state, updateState }) => {
    const hanteraExtraKostnader = (typ, checked) => {
        let nyaKostnader = state.extraKostnader || 0;
        
        if (typ === 'provtryckning') {
            const kostnad = state.köldmediaMängd > 3 
                ? PROVTRYCKNING_KOSTNAD.OVER_3KG 
                : PROVTRYCKNING_KOSTNAD.UNDER_3KG;
            nyaKostnader = checked 
                ? nyaKostnader + kostnad
                : nyaKostnader - kostnad;
        } else if (typ === 'svetsmaterial') {
            nyaKostnader = checked 
                ? nyaKostnader + SVETS_MATERIAL_KOSTNAD
                : nyaKostnader - SVETS_MATERIAL_KOSTNAD;
        }

        updateState('extraKostnader', nyaKostnader);
    };

    // Kontrollera att köldmediaTyp finns i KÖLDMEDIA_TYPER
    const köldmedia = KÖLDMEDIA_TYPER[state.köldmediaTyp] || { namn: '', pris: 0 };

    return (
        <div className="space-y-4 mt-6">
            <h3 className="font-medium">Avancerade inställningar</h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Köldmediatyp
                    </label>
                    <select
                        value={state.köldmediaTyp}
                        onChange={e => updateState('köldmediaTyp', e.target.value)}
                        className="w-full p-2 border rounded-md shadow-sm"
                    >
                        <option value="">Välj köldmediatyp</option>
                        {Object.entries(KÖLDMEDIA_TYPER)
                            .filter(([key]) => key !== 'REPARATION' && key !== 'LUFT_LUFT')
                            .map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value.namn} - {value.pris?.toFixed(2)} kr/kg
                                </option>
                            ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Köldmediamängd (kg)
                    </label>
                    <input
                        type="number"
                        value={state.köldmediaMängd || ''}
                        onChange={e => updateState('köldmediaMängd', Number(e.target.value))}
                        className="w-full p-2 border rounded-md shadow-sm"
                        min="0"
                        step="0.1"
                        placeholder="0.0"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={state.provtryckning}
                        onChange={e => updateState('provtryckning', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                        Provtryckning krävs
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={state.svetsMaterial}
                        onChange={e => updateState('svetsMaterial', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                        Svetsmaterial behövs
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={state.uppföljandeläcksökning}
                        onChange={e => updateState('uppföljandeläcksökning', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                        Uppföljande läcksökning krävs
                    </label>
                </div>
            </div>
        </div>
    );
};
