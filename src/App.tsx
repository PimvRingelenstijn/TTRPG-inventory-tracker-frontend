import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import {
    HomePage,
    GameSystemsPage,
    PlayerCharacterPage,
    LoginPage,
    RegisterPage,
    DashboardPage
} from './pages';
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <Navigation />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/game-systems" element={<GameSystemsPage />} />
                        <Route path="/player-character" element={<PlayerCharacterPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        {/*<Route path="x" element ={<protected><page/></protected>} /> */}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;