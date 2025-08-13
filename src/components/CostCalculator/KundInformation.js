import React from 'react';

export const KundInformation = ({ state, updateState }) => {
    return (
        <div className="space-y-6">
            {/* Kundtypsväljare */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Välj kundtyp:
                </label>
                <div className="flex gap-4">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            value="foretag"
                            checked={state.kundTyp === 'foretag'}
                            onChange={e => updateState('kundTyp', e.target.value)}
                            className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Företag</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            value="privat"
                            checked={state.kundTyp === 'privat'}
                            onChange={e => updateState('kundTyp', e.target.value)}
                            className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Privatperson</span>
                    </label>
                </div>
            </div>

            {/* Kundfält */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.kundTyp === 'foretag' ? (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Företagsnamn <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={state.kundNamn}
                                onChange={e => updateState('kundNamn', e.target.value)}
                                className="w-full p-2 border rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kontaktperson <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={state.kontaktperson}
                                onChange={e => updateState('kontaktperson', e.target.value)}
                                className="w-full p-2 border rounded-md shadow-sm"
                                required
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Förnamn <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={state.fornamn || ''}
                                onChange={e => updateState('fornamn', e.target.value)}
                                className="w-full p-2 border rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Efternamn <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={state.efternamn || ''}
                                onChange={e => {
                                    updateState('efternamn', e.target.value);
                                    updateState('kundNamn', `${state.fornamn || ''} ${e.target.value}`);
                                }}
                                className="w-full p-2 border rounded-md shadow-sm"
                                required
                            />
                        </div>
                    </>
                )}
            </div>

            <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                    </label>
                    <input
                        type="tel"
                        value={state.kundTelefon}
                        onChange={e => updateState('kundTelefon', e.target.value)}
                        className="w-full p-2 border rounded-md shadow-sm text-base"
                        placeholder="Telefonnummer (valfritt)"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        E-post
                    </label>
                    <input
                        type="email"
                        value={state.kundEmail}
                        onChange={e => updateState('kundEmail', e.target.value)}
                        className="w-full p-2 border rounded-md shadow-sm text-base"
                        placeholder="E-postadress (valfritt)"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adress
                </label>
                <input
                    type="text"
                    value={state.kundAdress}
                    onChange={e => updateState('kundAdress', e.target.value)}
                    className="w-full p-2 border rounded-md shadow-sm text-base"
                    placeholder="Adress (valfritt)"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Anläggning/Objekt
                </label>
                <input
                    type="text"
                    value={state.anläggning}
                    onChange={e => updateState('anläggning', e.target.value)}
                    className="w-full p-2 border rounded-md shadow-sm text-base"
                    placeholder="T.ex. Värmepump, Kylskåp etc. (valfritt)"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Beskrivning
                </label>
                <textarea
                    value={state.beskrivning}
                    onChange={e => updateState('beskrivning', e.target.value)}
                    className="w-full p-2 border rounded-md shadow-sm text-base"
                    rows="3"
                    placeholder="Beskriv vad kostnadsförslaget gäller (valfritt)"
                />
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
                <span className="text-red-500">*</span> Obligatoriska fält
            </p>
        </div>
    );
};
