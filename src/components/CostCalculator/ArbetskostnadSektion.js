import React from 'react';
import { TIMPRIS } from '../../constants/pricing';

export const ArbetskostnadSektion = ({ state, updateState }) => {
    // Hjälpfunktion för att visa tomma fält istället för 0
    const displayValue = (value) => value === 0 ? '' : value;

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={state.tidigareFelsökning}
                        onChange={e => updateState('tidigareFelsökning', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300"
                    />
                    <label className="text-sm font-medium text-gray-700">
                        Tidigare utförd felsökning
                    </label>
                </div>

                {state.tidigareFelsökning && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tidigare arbetade timmar ({TIMPRIS} kr/h exkl. moms)
                        </label>
                        <input
                            type="number"
                            value={displayValue(state.tidigareTimmar)}
                            onChange={e => updateState('tidigareTimmar', Number(e.target.value) || 0)}
                            className="w-full p-2 border rounded-md shadow-sm"
                            min="0"
                            step="0.5"
                            placeholder="0"
                        />
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Arbetskostnad för reparation ({TIMPRIS} kr/h exkl. moms)
                </label>
                <input
                    type="number"
                    value={displayValue(state.timmar)}
                    onChange={e => updateState('timmar', Number(e.target.value) || 0)}
                    className="w-full p-2 border rounded-md shadow-sm"
                    min="0"
                    step="0.5"
                    placeholder="0"
                />
            </div>
        </div>
    );
};
