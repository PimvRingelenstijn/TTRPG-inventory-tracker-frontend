// src/features/gameSystems/components/GameSystemList.tsx
import React from 'react';
import GameSystemCard from './GameSystemCard';
import type { GameSystemsResponse } from '@/api';

interface GameSystemListProps {
    gameSystems: GameSystemsResponse[];
    loading: boolean;
    error: string;
}

const GameSystemList: React.FC<GameSystemListProps> = ({ gameSystems, loading, error }) => {
    if (loading) {
        return (
            <div className="loading-message">
                <p>Loading game systems...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message">
                <p>Error: {error}</p>
            </div>
        );
    }

    if (gameSystems.length === 0) {
        return (
            <div className="empty-message">
                <p>No game systems found. Add one above!</p>
            </div>
        );
    }

    return (
        <div className="systems-grid">
            {gameSystems.map(system => (
                <GameSystemCard key={system.id} system={system} />
            ))}
        </div>
    );
};

export default GameSystemList;