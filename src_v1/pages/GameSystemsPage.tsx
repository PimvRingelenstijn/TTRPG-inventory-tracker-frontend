import React, { useState, useEffect } from 'react';
import { getGameSystems, createGameSystem } from '../services/api';
import type { GameSystem, CreateGameSystemDTO } from '../services/api';

const GameSystemsPage: React.FC = () => {
    const [gameSystems, setGameSystems] = useState<GameSystem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [newSystem, setNewSystem] = useState<CreateGameSystemDTO>({
        name: '',
        description: '',
    });

    // Fetch game systems on component mount
    useEffect(() => {
        fetchGameSystems();
    }, []);

    const fetchGameSystems = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await getGameSystems();
            setGameSystems(data);
            console.log('Game systems loaded:', data); // Debug log
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(`Failed to load game systems: ${errorMessage}`);
            console.error('Error loading game systems:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewSystem(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate
        if (!newSystem.name.trim()) {
            setError('Game system name is required');
            return;
        }

        if (!newSystem.description.trim()) {
            setError('Description is required');
            return;
        }

        try {
            setError('');
            const createdSystem = await createGameSystem(newSystem);

            // Add the new system to the list and reset the form
            setGameSystems(prev => [...prev, createdSystem]);
            setNewSystem({
                name: '',
                description: '',
            });

            console.log('New system added:', createdSystem); // Debug log
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(`Failed to create game system: ${errorMessage}`);
            console.error('Error creating game system:', err);
        }
    };

    return (
        <div className="game-systems-page">
            <h1>TTRPG Game Systems</h1>

            {/* Add New Game System Form */}
            <div className="add-system-form">
                <h2>Add New Game System</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newSystem.name}
                            onChange={handleInputChange}
                            placeholder="e.g., Dungeons & Dragons 5e"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newSystem.description}
                            onChange={handleInputChange}
                            placeholder="Describe the game system..."
                            rows={3}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Add Game System
                    </button>
                </form>
            </div>

            {/* Error Display */}
            {error && (
                <div className="error-message">
                    <p>Error: {error}</p>
                </div>
            )}

            {/* Game Systems List */}
            <div className="game-systems-list">
                <h2>Available Game Systems ({gameSystems.length})</h2>

                {loading ? (
                    <div className="loading-message">
                        <p>Loading game systems...</p>
                    </div>
                ) : gameSystems.length === 0 ? (
                    <div className="empty-message">
                        <p>No game systems found. Add one above!</p>
                    </div>
                ) : (
                    <div className="systems-grid">
                        {gameSystems.map(system => (
                            <div key={system.id} className="system-card">
                                <h3>{system.name}</h3>
                                <p className="description">{system.description}</p>
                                <div className="system-meta">
                                    <small>ID: {system.id}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameSystemsPage;