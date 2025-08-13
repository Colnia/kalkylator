export const saveCalculation = (calculation) => {
    const timestamp = new Date().toISOString();
    const savedCalculations = JSON.parse(localStorage.getItem('calculations') || '[]');
    
    const newCalculation = {
        id: timestamp,
        date: timestamp,
        ...calculation
    };
    
    savedCalculations.push(newCalculation);
    localStorage.setItem('calculations', JSON.stringify(savedCalculations));
    return newCalculation;
};

export const getCalculations = () => {
    return JSON.parse(localStorage.getItem('calculations') || '[]');
};

export const deleteCalculation = (id) => {
    const calculations = getCalculations();
    const filtered = calculations.filter(calc => calc.id !== id);
    localStorage.setItem('calculations', JSON.stringify(filtered));
};
