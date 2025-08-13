import React from 'react';

export const KundSektion = ({ state, updateState }) => {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Kundinformation</h3>
            
            {/* Kundtyp */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kundtyp
                </label>
                <select
                    value={state.kundTyp}
                    onChange={e => updateState('kundTyp', e.target.value)}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="privat">Privatperson</option>
                    <option value="foretag">Företag</option>
                </select>
            </div>

            {/* Företagsinformation */}
            {state.kundTyp === 'foretag' && (
                <>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Företagsnamn
                        </label>
                        <input
                            type="text"
                            value={state.kundNamn}
                            onChange={e => updateState('kundNamn', e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kontaktperson
                        </label>
                        <input
                            type="text"
                            value={state.kontaktperson}
                            onChange={e => updateState('kontaktperson', e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                </>
            )}

            {/* Privatpersonsinformation */}
            {state.kundTyp === 'privat' && (
                <>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Förnamn
                        </label>
                        <input
                            type="text"
                            value={state.fornamn}
                            onChange={e => updateState('fornamn', e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Efternamn
                        </label>
                        <input
                            type="text"
                            value={state.efternamn}
                            onChange={e => updateState('efternamn', e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                </>
            )}

            {/* Gemensam kontaktinformation */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adress
                </label>
                <input
                    type="text"
                    value={state.kundAdress}
                    onChange={e => updateState('kundAdress', e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                </label>
                <input
                    type="tel"
                    value={state.kundTelefon}
                    onChange={e => updateState('kundTelefon', e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-post
                </label>
                <input
                    type="email"
                    value={state.kundEmail}
                    onChange={e => updateState('kundEmail', e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>
        </div>
    );
};
