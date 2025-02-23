import React, { useState, useCallback } from 'react';
import { KundInformation } from './KundInformation';
import { ArbetskostnadSektion } from './ArbetskostnadSektion';
import { MaterialSektion } from './MaterialSektion';
import { AvanceradSektion } from './AvanceradSektion';
import { LuftLuftSektion } from './LuftLuftSektion';
import { Summering } from './Summering';
import { ExtraSektion } from './ExtraSektion';
import { INSTALLATION_TYPER } from '../../constants/installation';
import ReparationKalkylator from './ReparationKalkylator';
import { KALKYLATOR_TYPER } from '../../constants/pricing';
import { KundSektion } from './KundSektion';
import { ReparationSektion } from './ReparationSektion';
import { VärmepumpSummering } from './VärmepumpSummering';
import { ReparationSummering } from './ReparationSummering';

const STEG = {
    TYP: 0,
    KUND: 1,
    DETALJER: 2,
    EXTRA: 3,
    SUMMERING: 4
};

const initialState = {
    kalkylatorsTyp: KALKYLATOR_TYPER.LUFT_LUFT,
    kundTyp: 'privat',
    
    // Kundinformation
    kundNamn: '',
    fornamn: '',
    efternamn: '',
    kontaktperson: '',
    kundAdress: '',
    kundTelefon: '',
    kundEmail: '',
    
    // Värmepumpsinstallation
    värmepump: null,
    installationsTyp: '',
    väggtyp: '',
    utomhusenhetPlacering: '',
    extraMaterial: [],
    extraRörlängd: 0,
    extraRörlängdKostnad: 0,
    
    // Reparation
    anläggning: '',
    beskrivning: '',
    timmar: 0,
    material: [],
    provtryckning: false,
    svetsMaterial: false,
    köldmediaMängd: 0,
    
    // Gemensamma fält
    datum: new Date().toISOString().split('T')[0],
    teknikerNoteringar: ''
};

export const KostnadsKalkylator = () => {
    const [state, setState] = useState(initialState);

    const updateState = (key, value) => {
        setState(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Välj kalkylatortyp */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Välj typ av kalkylator
                </label>
                <select
                    value={state.kalkylatorsTyp}
                    onChange={e => updateState('kalkylatorsTyp', e.target.value)}
                    className="w-full p-2 border rounded-md"
                >
                    <option value={KALKYLATOR_TYPER.LUFT_LUFT}>Luftvärmepump installation</option>
                    <option value={KALKYLATOR_TYPER.REPARATION}>Reparation</option>
                </select>
            </div>

            {/* Kundinformation */}
            <KundSektion state={state} updateState={updateState} />

            {/* Visa relevant sektion baserat på vald kalkylatortyp */}
            {state.kalkylatorsTyp === KALKYLATOR_TYPER.LUFT_LUFT ? (
                <>
                    <LuftLuftSektion state={state} updateState={updateState} />
                    <VärmepumpSummering state={state} />
                </>
            ) : (
                <>
                    <ReparationSektion state={state} updateState={updateState} />
                    <ReparationSummering state={state} />
                </>
            )}
        </div>
    );
}; 