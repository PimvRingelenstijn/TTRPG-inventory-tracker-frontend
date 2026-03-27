// src/features/gameSystems/components/GameSystemCard.tsx
import React from 'react';
import type { GameSystemsResponse } from '@/api';

interface GameSystemCardProps {
    system: GameSystemsResponse;
}

const GameSystemCard: React.FC<GameSystemCardProps> = ({ system }) => {
    return (
        <div className="system-card">
            <h3>{system.name}</h3>
            <p className="description">{system.description}</p>
            <div className="system-meta">
                <small>ID: {system.id}</small>
            </div>
        </div>
    );
};

export default GameSystemCard;