// src/pages/GameSystems/index.tsx
import React from 'react';
import { GameSystemForm, GameSystemList } from '@/features/gameSystems/components';
import { useGameSystems } from '@/features/gameSystems/hooks/useGameSystems';

const GameSystemsPage: React.FC = () => {
    const { gameSystems, loading, error, refetch } = useGameSystems();

    return (
        <div className="game-systems-page">
            <h1>TTRPG Game Systems</h1>

            <GameSystemForm onSuccess={refetch} />

            <div className="game-systems-list">
                <h2>Available Game Systems ({gameSystems.length})</h2>
                <GameSystemList
                    gameSystems={gameSystems}
                    loading={loading}
                    error={error}
                />
            </div>
        </div>
    );
};

export default GameSystemsPage;