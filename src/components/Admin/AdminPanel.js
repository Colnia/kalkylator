import React, { useState } from 'react';
import { 
    VARMEPUMPAR,
    INSTALLATIONS_MATERIAL,
    ARBETSKOSTNADER,
    GENERELLA_INSTÄLLNINGAR,
    VÄGG_TILLÄGG,
    PLACERING_TILLÄGG
} from '../../constants/priser';

export const AdminPanel = ({ onClose }) => {
    const [priser, setPriser] = useState({
        varmepumpar: VARMEPUMPAR,
        installationsMaterial: INSTALLATIONS_MATERIAL,
        arbetskostnader: ARBETSKOSTNADER,
        väggTillägg: VÄGG_TILLÄGG,
        placeringTillägg: PLACERING_TILLÄGG,
        generella: GENERELLA_INSTÄLLNINGAR
    });

    const [kampanjer, setKampanjer] = useState([]);
    const [nyKampanj, setNyKampanj] = useState({
        namn: '',
        startDatum: '',
        slutDatum: '',
        rabatt: 0,
        produkter: []
    });

    const handlePrisUpdate = (kategori, sektion, produkt, fält, värde) => {
        setPriser(prev => ({
            ...prev,
            [kategori]: {
                ...prev[kategori],
                [sektion]: {
                    ...prev[kategori][sektion],
                    [produkt]: {
                        ...prev[kategori][sektion][produkt],
                        [fält]: Number(värde)
                    }
                }
            }
        }));
    };

    const handleGenerellaInställningar = (fält, värde) => {
        setPriser(prev => ({
            ...prev,
            generella: {
                ...prev.generella,
                [fält]: värde
            }
        }));
    };

    const sparaPriser = () => {
        // Här kan vi implementera sparande till backend/databas
        localStorage.setItem('priser', JSON.stringify(priser));
        localStorage.setItem('kampanjer', JSON.stringify(kampanjer));
        alert('Priserna har sparats!');
    };

    const läggTillKampanj = () => {
        if (nyKampanj.namn && nyKampanj.startDatum && nyKampanj.slutDatum) {
            setKampanjer([...kampanjer, nyKampanj]);
            setNyKampanj({
                namn: '',
                startDatum: '',
                slutDatum: '',
                rabatt: 0,
                produkter: []
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Administrationspanel</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Värmepumpar */}
                    <section>
                        <h3 className="text-xl font-semibold mb-4">Värmepumpar</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th>Artikelnr</th>
                                        <th>Modell</th>
                                        <th>Inköpspris</th>
                                        <th>Påslag</th>
                                        <th>Ordinarie</th>
                                        <th>Kampanj</th>
                                        <th>Lager</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(priser.varmepumpar).map(([serie, modeller]) =>
                                        Object.entries(modeller).map(([modell, data]) => (
                                            <tr key={data.artikelnummer}>
                                                <td>{data.artikelnummer}</td>
                                                <td>{data.model}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={data.inköpspris}
                                                        onChange={(e) => handlePrisUpdate('varmepumpar', serie, modell, 'inköpspris', e.target.value)}
                                                        className="border p-1 w-24"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={data.påslag * 100}
                                                        onChange={(e) => handlePrisUpdate('varmepumpar', serie, modell, 'påslag', e.target.value / 100)}
                                                        className="border p-1 w-20"
                                                        step="0.01"
                                                    />%
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={data.ordinarie}
                                                        onChange={(e) => handlePrisUpdate('varmepumpar', serie, modell, 'ordinarie', e.target.value)}
                                                        className="border p-1 w-24"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={data.kampanj}
                                                        onChange={(e) => handlePrisUpdate('varmepumpar', serie, modell, 'kampanj', e.target.value)}
                                                        className="border p-1 w-24"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={data.lagerantal}
                                                        onChange={(e) => handlePrisUpdate('varmepumpar', serie, modell, 'lagerantal', e.target.value)}
                                                        className="border p-1 w-20"
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Installationsmaterial */}
                    <section>
                        <h3 className="text-xl font-semibold mb-4">Installationsmaterial</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th>Artikelnr</th>
                                        <th>Namn</th>
                                        <th>Inköpspris</th>
                                        <th>Påslag</th>
                                        <th>Försäljning</th>
                                        <th>Lager</th>
                                        <th>Min.lager</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(priser.installationsMaterial).map(([kategori, items]) =>
                                        Object.entries(items).map(([item, data]) => (
                                            <tr key={data.artikelnummer}>
                                                <td>{data.artikelnummer}</td>
                                                <td>{data.namn}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={data.inköpspris}
                                                        onChange={(e) => handlePrisUpdate('installationsMaterial', kategori, item, 'inköpspris', e.target.value)}
                                                        className="border p-1 w-24"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={data.påslag * 100}
                                                        onChange={(e) => handlePrisUpdate('installationsMaterial', kategori, item, 'påslag', e.target.value / 100)}
                                                        className="border p-1 w-20"
                                                        step="0.01"
                                                    />%
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={data.försäljningspris}
                                                        onChange={(e) => handlePrisUpdate('installationsMaterial', kategori, item, 'försäljningspris', e.target.value)}
                                                        className="border p-1 w-24"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={data.lagerantal}
                                                        onChange={(e) => handlePrisUpdate('installationsMaterial', kategori, item, 'lagerantal', e.target.value)}
                                                        className="border p-1 w-20"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={data.minLager}
                                                        onChange={(e) => handlePrisUpdate('installationsMaterial', kategori, item, 'minLager', e.target.value)}
                                                        className="border p-1 w-20"
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Kampanjer */}
                    <section>
                        <h3 className="text-xl font-semibold mb-4">Kampanjer</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Kampanjnamn"
                                    value={nyKampanj.namn}
                                    onChange={(e) => setNyKampanj({...nyKampanj, namn: e.target.value})}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="number"
                                    placeholder="Rabatt %"
                                    value={nyKampanj.rabatt}
                                    onChange={(e) => setNyKampanj({...nyKampanj, rabatt: Number(e.target.value)})}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="date"
                                    value={nyKampanj.startDatum}
                                    onChange={(e) => setNyKampanj({...nyKampanj, startDatum: e.target.value})}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="date"
                                    value={nyKampanj.slutDatum}
                                    onChange={(e) => setNyKampanj({...nyKampanj, slutDatum: e.target.value})}
                                    className="border p-2 rounded"
                                />
                            </div>
                            <button
                                onClick={läggTillKampanj}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Lägg till kampanj
                            </button>

                            {/* Lista aktiva kampanjer */}
                            <div className="mt-4">
                                <h4 className="font-medium mb-2">Aktiva kampanjer</h4>
                                {kampanjer.map((kampanj, index) => (
                                    <div key={index} className="border p-2 rounded mb-2">
                                        <div className="flex justify-between">
                                            <span>{kampanj.namn}</span>
                                            <span>{kampanj.rabatt}% rabatt</span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(kampanj.startDatum).toLocaleDateString()} - 
                                            {new Date(kampanj.slutDatum).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Generella inställningar */}
                    <section>
                        <h3 className="text-xl font-semibold mb-4">Generella inställningar</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Standard påslag (%)</label>
                                <input
                                    type="number"
                                    value={priser.generella.STANDARD_PÅSLAG * 100}
                                    onChange={(e) => handleGenerellaInställningar('STANDARD_PÅSLAG', Number(e.target.value) / 100)}
                                    className="border p-2 rounded w-full"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Moms (%)</label>
                                <input
                                    type="number"
                                    value={priser.generella.MOMS * 100}
                                    onChange={(e) => handleGenerellaInställningar('MOMS', Number(e.target.value) / 100)}
                                    className="border p-2 rounded w-full"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">ROT-avdrag (%)</label>
                                <input
                                    type="number"
                                    value={priser.generella.ROT.PROCENT * 100}
                                    onChange={(e) => handleGenerellaInställningar('ROT', {
                                        ...priser.generella.ROT,
                                        PROCENT: Number(e.target.value) / 100
                                    })}
                                    className="border p-2 rounded w-full"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Max ROT-avdrag</label>
                                <input
                                    type="number"
                                    value={priser.generella.ROT.MAX_BELOPP}
                                    onChange={(e) => handleGenerellaInställningar('ROT', {
                                        ...priser.generella.ROT,
                                        MAX_BELOPP: Number(e.target.value)
                                    })}
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Avbryt
                        </button>
                        <button
                            onClick={sparaPriser}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Spara ändringar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}; 