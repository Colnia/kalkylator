import React, { useState } from 'react';
import { VARMEPUMPAR, INSTALLATION_PRIS } from '../../constants/varmepumpar';
import { MATERIAL_PRISER, INSTALLATION_KOSTNADER, STANDARD_INSTALLATION, UTBYTES_INSTALLATION } from '../../constants/installationspriser';
import { INSTALLATION_TYPER, VÄGG_TYPER, PLACERINGAR } from '../../constants/installation';
import { MOMS } from '../../constants/kostnader';
import { VärmepumpsVäljare } from './VärmepumpsVäljare';

export const LuftLuftSektion = ({ state, updateState }) => {
    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-blue-700">
                    <strong>Information:</strong> {state.kundTyp === 'privat' 
                        ? 'Alla priser är inklusive moms. Kampanjpriser gäller vid installation och ROT-avdrag kan utnyttjas på arbetskostnaden.'
                        : 'Alla priser är exklusive moms. Ordinarie priser gäller för företag.'}
                </p>
            </div>

            {/* Värmepumpsväljare */}
            <VärmepumpsVäljare state={state} updateState={updateState} />

            {/* Installationstyp */}
            <div>
                <h3 className="font-medium mb-4">Installationsdetaljer</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Installationstyp
                    </label>
                    <select
                        value={state.installationsTyp}
                        onChange={e => updateState('installationsTyp', e.target.value)}
                        className="w-full p-2 border rounded-md shadow-sm"
                    >
                        <option value="">Välj typ</option>
                        <option value={INSTALLATION_TYPER.STANDARD}>Standardinstallation</option>
                        <option value={INSTALLATION_TYPER.UTBYTE}>Utbytesinstallation</option>
                        <option value={INSTALLATION_TYPER.KOMPLEX}>Komplex installation</option>
                    </select>
                </div>

                {/* Visa väggtyp och placering för alla installationstyper */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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
                            <option value={PLACERINGAR.BALKONG}>Balkongmontage</option>
                            <option value={PLACERINGAR.TAK}>Takmontage</option>
                        </select>
                    </div>
                </div>

                {/* Extra utrustning och material */}
                <div className="mt-6">
                    <h3 className="font-medium mb-4">Extra utrustning och material</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Extra rörlängd (meter)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={state.extraRörlängd || 0}
                                    onChange={e => updateState('extraRörlängd', parseInt(e.target.value) || 0)}
                                    className="w-full p-2 border rounded-md shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={state.extraMaterial.includes('konsolsats')}
                                    onChange={e => {
                                        const newExtraMaterial = e.target.checked 
                                            ? [...state.extraMaterial, 'konsolsats']
                                            : state.extraMaterial.filter(item => item !== 'konsolsats');
                                        updateState('extraMaterial', newExtraMaterial);
                                    }}
                                    className="w-4 h-4"
                                />
                                <label>Konsolsats</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={state.extraMaterial.includes('värmekabel')}
                                    onChange={e => {
                                        const newExtraMaterial = e.target.checked 
                                            ? [...state.extraMaterial, 'värmekabel']
                                            : state.extraMaterial.filter(item => item !== 'värmekabel');
                                        updateState('extraMaterial', newExtraMaterial);
                                    }}
                                    className="w-4 h-4"
                                />
                                <label>Värmekabel för dränering</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={state.extraMaterial.includes('kondensvattenslang')}
                                    onChange={e => {
                                        const newExtraMaterial = e.target.checked 
                                            ? [...state.extraMaterial, 'kondensvattenslang']
                                            : state.extraMaterial.filter(item => item !== 'kondensvattenslang');
                                        updateState('extraMaterial', newExtraMaterial);
                                    }}
                                    className="w-4 h-4"
                                />
                                <label>Extra kondensvattenslang</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 