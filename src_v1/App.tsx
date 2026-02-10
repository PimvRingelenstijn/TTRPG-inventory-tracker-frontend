
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage.tsx';
import GameSystemsPage from './pages/GameSystemsPage';
import './App.css';
import PlayerCharacterPage from "./pages/PlayerCharacterPage.tsx";

function App() {
    return (
        <Router>
            <div className="App">
                <Navigation />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/game-systems" element={<GameSystemsPage />} />
                        <Route path="/player-character" element={<PlayerCharacterPage />} />
                        {/* Add more routes as you create more pages */}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
