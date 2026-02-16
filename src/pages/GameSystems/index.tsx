// src/pages/GameSystems/index.tsx
import React, { useState, useEffect } from 'react';
import { gameSystemsService } from '@/api'; // Updated path
import type { GameSystemsResponse, CreateGameSystemRequest } from '@/api'; // Updated path
import type { GameSystemFormData } from './types'

const GameSystemsPage: React.FC = () => {
    const [gameSystems, setGameSystems] = useState<GameSystemsResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState<GameSystemFormData>({
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
            const data = await gameSystemsService.getGameSystems();
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
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate
        if (!formData.name.trim()) {
            setError('Game system name is required');
            return;
        }

        if (!formData.description.trim()) {
            setError('Description is required');
            return;
        }

        try {
            setError('');
            const gameSystemRequest: CreateGameSystemRequest = {
                name: formData.name,
                description: formData.description
            }

            const createdSystem: GameSystemsResponse = await gameSystemsService.createGameSystem(gameSystemRequest);

            // Add the new system to the list and reset the form
            setGameSystems(prev => [...prev, createdSystem]);
            setFormData({
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
                            value={formData.name}
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
                            value={formData.description}
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