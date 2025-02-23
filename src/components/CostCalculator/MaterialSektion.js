import React, { useState } from 'react';

const PÅSLAG = 1.42;

export const MaterialSektion = ({ 
    material = [], 
    onAddMaterial, 
    updateMaterial, 
    removeMaterial,
    flikNamn 
}) => {
    const [materialNamn, setMaterialNamn] = useState('');
    const [antal, setAntal] = useState(0);
    const [pris, setPris] = useState(0);

    const handleAdd = () => {
        if (materialNamn && antal > 0 && pris > 0) {
            const newMaterial = {
                namn: materialNamn,
                antal: Number(antal),
                pris: Number(pris)
            };
            onAddMaterial(newMaterial);
            setMaterialNamn('');
            setAntal(0);
            setPris(0);
        }
    };

    console.log("Material:", material); // Debugging

    return (
        <div className="space-y-4">
            <h3 className="font-medium">{flikNamn}</h3>
            
            <div className="space-y-2">
                {material.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <input
                            type="text"
                            value={item.namn}
                            onChange={e => updateMaterial(index, 'namn', e.target.value)}
                            className="flex-1 p-2 border rounded-md"
                            placeholder="Materialnamn"
                        />
                        <input
                            type="number"
                            value={item.antal || ''}
                            onChange={e => updateMaterial(index, 'antal', Number(e.target.value))}
                            className="w-20 p-2 border rounded-md"
                            min="0"
                            placeholder="Antal"
                        />
                        <input
                            type="number"
                            value={item.pris || ''}
                            onChange={e => updateMaterial(index, 'pris', Number(e.target.value))}
                            className="w-32 p-2 border rounded-md"
                            min="0"
                            placeholder="Pris"
                        />
                        <button
                            onClick={() => removeMaterial(index)}
                            className="p-2 text-red-500 hover:text-red-700"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex gap-2 items-center">
                <input
                    type="text"
                    value={materialNamn}
                    onChange={e => setMaterialNamn(e.target.value)}
                    className="flex-1 p-2 border rounded-md"
                    placeholder="Materialnamn"
                />
                <input
                    type="number"
                    value={antal || ''}
                    onChange={e => setAntal(Number(e.target.value))}
                    className="w-20 p-2 border rounded-md"
                    min="0"
                    placeholder="Antal"
                />
                <input
                    type="number"
                    value={pris || ''}
                    onChange={e => setPris(Number(e.target.value))}
                    className="w-32 p-2 border rounded-md"
                    min="0"
                    placeholder="Pris"
                />
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50"
                >
                    + Lägg till
                </button>
            </div>
        </div>
    );
};