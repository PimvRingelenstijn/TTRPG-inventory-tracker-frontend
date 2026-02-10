import React, { useState, useEffect } from 'react';

interface GameSystem {
    id: number;
    name: string;
    description: string;
}

const DebugGameSystemsPage: React.FC = () => {
    const [gameSystems, setGameSystems] = useState<GameSystem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log('DEBUG: Starting fetch...');

                // Direct fetch to test
                const response = await fetch('http://localhost:8000/game-systems');
                console.log('DEBUG: Response status:', response.status);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('DEBUG: Received data:', data);

                setGameSystems(data);
                setError('');
            } catch (err) {
                console.error('DEBUG: Fetch error:', err);
                setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>DEBUG: TTRPG Game Systems</h1>

            <div style={{
                backgroundColor: '#f0f0f0',
                padding: '15px',
                borderRadius: '5px',
                marginBottom: '20px'
            }}>
                <h2>API Test Results</h2>
                <p>Endpoint: <code>http://localhost:8000/game-systems</code></p>
                <p>Status: {loading ? 'Loading...' : 'Loaded'}</p>
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            </div>

            <h2>Game Systems ({gameSystems.length})</h2>

            {loading ? (
                <p>Loading game systems...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : gameSystems.length === 0 ? (
                <p>No game systems found.</p>
            ) : (
                <div style={{ display: 'grid', gap: '15px' }}>
                    {gameSystems.map(system => (
                        <div
                            key={system.id}
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                padding: '15px',
                                backgroundColor: 'white'
                            }}
                        >
                            <h3 style={{ marginTop: 0 }}>{system.name}</h3>
                            <p>{system.description}</p>
                            <p><small>ID: {system.id}</small></p>
                        </div>
                    ))}
                </div>
            )}

            {/* Add a refresh button */}
            <button
                onClick={() => window.location.reload()}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Refresh Page
            </button>
        </div>
    );
};

export default DebugGameSystemsPage;