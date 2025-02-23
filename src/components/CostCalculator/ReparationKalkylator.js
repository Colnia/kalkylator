import React, { useState } from 'react';
import { MaterialSektion } from './MaterialSektion';

const ReparationKalkylator = () => {
    const [timmar, setTimmar] = useState(0);
    const [material, setMaterial] = useState([]);

    const handleAddMaterial = (newMaterial) => {
        setMaterial([...material, newMaterial]);
    };

    const beraknaTotal = () => {
        const arbetskostnad = timmar * MATERIAL_PRISER.KOSTNAD_TIM;
        const totalKostnad = arbetskostnad + material.reduce((total, item) => total + item.pris * item.antal, 0);
        return totalKostnad;
    };

    return (
        <div>
            <h3>Reparation Kalkylator</h3>
            <input
                type="number"
                value={timmar}
                onChange={(e) => setTimmar(e.target.value)}
                placeholder="Antal timmar"
            />
            <MaterialSektion onAddMaterial={handleAddMaterial} />
            <div>
                <h4>Total Kostnad: {beraknaTotal()} kr</h4>
            </div>
        </div>
    );
};

export default ReparationKalkylator; 