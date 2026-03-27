import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
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
            <AuthProvider>
                <div>
                    <Navigation />
                    <main>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/game-systems" element={<GameSystemsPage />} />

                            {/* Protected routes */}
                            <Route
                                path="/player-character"
                                element={
                                    <ProtectedRoute>
                                        <PlayerCharacterPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <DashboardPage />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </main>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;