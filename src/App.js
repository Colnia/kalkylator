import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navigation/Navbar';
import { StartPage } from './components/Home/StartPage';
import { KostnadsKalkylator } from './components/CostCalculator/KostnadsKalkylator';
import { RotKalkylator } from './components/RotCalculator/RotKalkylator';
import { AdminPanel } from './components/Admin/AdminPanel';
// Import ROT-kalkylator när den är klar
// import { RotKalkylator } from './components/RotCalculator/RotKalkylator';

function App() {
    const [visaAdmin, setVisaAdmin] = useState(false);

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navbar onSettingsClick={() => setVisaAdmin(true)} />
                <Switch>
                    <Route exact path="/" component={StartPage} />
                    <Route path="/kalkylator" component={KostnadsKalkylator} />
                    <Route path="/rotavdrag" component={RotKalkylator} />
                    {/* Lägg till ROT-kalkylatorn när den är klar */}
                    {/* <Route path="/rotavdrag" element={<RotKalkylator />} /> */}
                </Switch>
                {visaAdmin && <AdminPanel onClose={() => setVisaAdmin(false)} />}
            </div>
        </Router>
    );
}

export default App; 