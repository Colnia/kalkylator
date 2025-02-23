import React from 'react';

export const ResultatSektion = ({ resultat }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('sv-SE', {
            style: 'currency',
            currency: 'SEK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(Math.round(amount));
    };

    const ResultatKort = ({ titel, rader }) => (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-blue-900 mb-4 pb-2 border-b">
                {titel}
            </h3>
            <div className="space-y-3">
                {rader.map((rad, index) => (
                    <div 
                        key={index}
                        className={`flex justify-between items-center ${
                            index === rader.length - 1 ? 'pt-2 border-t font-medium' : ''
                        }`}
                    >
                        <span className="text-gray-700">{rad.label}</span>
                        <span className={index === rader.length - 1 ? 'text-blue-600' : ''}>
                            {formatCurrency(rad.varde)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Beräkningsresultat</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResultatKort 
                    titel="Totala kostnader"
                    rader={[
                        { label: 'Totalt inkl. moms före ROT', varde: resultat.totalInklMoms },
                        { label: 'Totalt exkl. moms före ROT', varde: resultat.totalExklMoms }
                    ]}
                />

                <ResultatKort 
                    titel="Arbetskostnader"
                    rader={[
                        { label: 'Arbete inkl. moms', varde: resultat.arbetskostnadInklMoms },
                        { label: 'Arbete exkl. moms', varde: resultat.arbetskostnadExklMoms }
                    ]}
                />

                <ResultatKort 
                    titel="Materialkostnader"
                    rader={[
                        { label: 'Material inkl. moms', varde: resultat.materialkostnadInklMoms },
                        { label: 'Material exkl. moms', varde: resultat.materialkostnadExklMoms }
                    ]}
                />

                <ResultatKort 
                    titel="ROT-avdrag och slutpris"
                    rader={[
                        { label: 'ROT-avdrag', varde: resultat.rotavdrag },
                        { label: 'Att betala efter ROT', varde: resultat.slutpris }
                    ]}
                />
            </div>
        </div>
    );
}; 