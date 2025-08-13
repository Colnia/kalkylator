import React, { useState } from 'react';
import { PUMP_TYPER, BERAKNINGS_METODER } from './utils/constants';
import { InputSektion } from './InputSektion';
import { InfoSektion } from './InfoSektion';
import { ResultatSektion } from './ResultatSektion';
import { beraknaResultat } from './utils/calculations';

export const RotKalkylator = () => {
    const [formData, setFormData] = useState({
        pumpTyp: PUMP_TYPER.LUFT_LUFT.id,
        berakningsMetod: BERAKNINGS_METODER.EFTER_ROT.id,
        pris: '',
    });

    const [resultat, setResultat] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setError('');
        setResultat(null);
    };

    const handleBerakna = () => {
        if (!formData.pris || isNaN(formData.pris) || formData.pris <= 0) {
            setError('Vänligen ange ett giltigt belopp');
            return;
        }

        try {
            const beraknatResultat = beraknaResultat(formData);
            setResultat(beraknatResultat);
            setError('');
        } catch (err) {
            setError('Ett fel uppstod vid beräkningen');
            console.error(err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h1 className="text-2xl font-bold mb-6">ROT-kalkylator för Värmepumpar</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <InputSektion 
                        formData={formData}
                        onChange={handleInputChange}
                        onBerakna={handleBerakna}
                        error={error}
                    />
                    <InfoSektion 
                        pumpTyp={formData.pumpTyp}
                    />
                </div>
            </div>

            {resultat && (
                <ResultatSektion 
                    resultat={resultat}
                />
            )}
        </div>
    );
};
