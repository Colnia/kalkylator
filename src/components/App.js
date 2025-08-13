import React, { useState } from 'react';
import { KostnadsKalkylator } from './CostCalculator/KostnadsKalkylator';
import { Navbar } from './Navigation/Navbar';
import { HistoryView } from './History/HistoryView';

function App() {
    const [currentTool, setCurrentTool] = useState('kalkylator');

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Företagsverktyg</h2>
                <Navbar currentTool={currentTool} setCurrentTool={setCurrentTool} />
                <div className="mt-6">
                    {currentTool === 'kalkylator' && <KostnadsKalkylator />}
                    {currentTool === 'historik' && <HistoryView />}
                </div>
            </div>
        </div>
    );
}

export default App;
