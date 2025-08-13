import React from 'react';
import { Link } from 'react-router-dom';

export const StartPage = () => {
    const verktyg = [
        {
            id: 'kostnadsforslag',
            titel: 'Kostnadsförslag',
            beskrivning: 'Skapa kostnadsförslag för reparationer och installationer',
            ikon: '💰',
            path: '/kalkylator'
        },
        {
            id: 'rotavdrag',
            titel: 'ROT-avdrag',
            beskrivning: 'Beräkna ROT-avdrag och arbetskostnad',
            ikon: '🏠',
            path: '/rotavdrag'
        }
        // Fler verktyg kan läggas till här
    ];

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-8 text-center">Företagsverktyg</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {verktyg.map(verktyg => (
                    <Link
                        key={verktyg.id}
                        to={verktyg.path}
                        className="block p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                    >
                        <div className="text-4xl mb-4">{verktyg.ikon}</div>
                        <h2 className="text-xl font-semibold mb-2">{verktyg.titel}</h2>
                        <p className="text-gray-600">{verktyg.beskrivning}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};
